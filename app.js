const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
// const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');

// Use path.resolve to correctly locate data files
const projectsPath = path.resolve(__dirname, 'data', 'projects.json');
const servicesPath = path.resolve(__dirname, 'data', 'services.json');

const projects = JSON.parse(fs.readFileSync(projectsPath));
const services = JSON.parse(fs.readFileSync(servicesPath));

require('dotenv').config();

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files - this is the key part for Vercel
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.currentYear = new Date().getFullYear();
  next();
});

// Routes
app.get('/', (req, res) => {
  res.render('home', {
    name: "Rajendhar Are",
    tagline: "Full-stack developer creating digital experiences",
    logoUrl: "/assets/myLogo.svg",
    projects: projects,
    services: services
  });
});

app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: process.env.CONTACT_EMAIL,
    from: process.env.CONTACT_EMAIL, // Must match verified domain in SendGrid
    subject: `New message from ${name}`,
    text: message,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
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

// Vercel requires us to export the app
module.exports = app;

// Only listen locally, Vercel will handle listening on its own
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}