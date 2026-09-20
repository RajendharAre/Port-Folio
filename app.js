const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const app = express();

require('dotenv').config();

// Load data files (site, projects and services)
const dataDir = path.join(__dirname, 'data');
const projects = JSON.parse(fs.readFileSync(path.join(dataDir, 'projects.json')));
const services = JSON.parse(fs.readFileSync(path.join(dataDir, 'services.json')));
const site = JSON.parse(fs.readFileSync(path.join(dataDir, 'site.json')));

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Behind a reverse proxy on Render/Vercel — needed for accurate rate-limit IPs
app.set('trust proxy', process.env.NODE_ENV === 'production' ? 1 : false);

// Serve static files with long-term caching
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '30d',              // Cache static assets for 30 days
  etag: true,                 // Enable ETag headers for version control
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache'); // Always revalidate HTML
    }
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Shared template data
app.use((req, res, next) => {
  res.locals.currentYear = new Date().getFullYear();
  res.locals.site = site;
  next();
});

// Escape user input before it is injected into the email HTML
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[char]));

// Limit contact submissions to 5 per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({ error: 'Too many messages sent. Please try again later.' });
  }
});

// Routes
app.get('/', (req, res) => {
  res.render('home', { projects: projects, services: services });
});

app.post('/contact', contactLimiter, async (req, res) => {
  const name = (req.body.name || '').toString().trim();
  const email = (req.body.email || '').toString().trim();
  const message = (req.body.message || '').toString().trim();
  const website = (req.body.website || '').toString().trim(); // Honeypot field

  // Honeypot — bots fill this hidden field. Silently accept so bots think it worked.
  if (website) {
    return res.status(200).json({ success: true });
  }

  // Server-side validation
  if (!name || name.length > 100) {
    return res.status(400).json({ error: 'Please provide your name (max 100 characters).' });
  }
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (!message || message.length > 5000) {
    return res.status(400).json({ error: 'Please provide a message (max 5000 characters).' });
  }

  const msg = {
    to: process.env.CONTACT_EMAIL || process.env.GMAIL_USER,
    from: process.env.GMAIL_USER, // Gmail requires the from to match the authenticated account
    subject: `New message from ${escapeHtml(name)}`,
    text: message,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong> ${escapeHtml(message)}</p>
      <p><small>Received at ${new Date().toLocaleString()}</small></p>
    `,
    replyTo: email // Allows direct replies
  };

  try {
    await transporter.sendMail(msg);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// 404 handler
app.use((req, res) => {
  if (req.path.startsWith('/contact') || req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.status(404).type('text/plain').send('404 — Page not found');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (req.path.startsWith('/contact') || req.path.startsWith('/api')) {
    return res.status(500).json({ error: 'Internal server error' });
  }
  res.status(500).type('text/plain').send('500 — Internal server error');
});

// Vercel requires us to export the app
module.exports = app;

// Only listen locally, Vercel will handle listening on its own
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}