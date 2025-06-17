const express = require('express');
const app = express();
const path = require('path');

// Config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.use((req, res, next) => {
  res.locals.currentYear = new Date().getFullYear();
  next();
});

// Mock projects data (temporary solution)
const projects = [
  {
    id: 1,
    title: "E-Commerce Website",
    description: "A full-stack e-commerce platform with payment integration",
    technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
    image_url: "/images/project1.jpg",
    github_url: "https://github.com/yourusername/ecommerce",
    live_url: "https://yourecommerce.example.com"
  },
  {
    id: 2,
    title: "Portfolio Template",
    description: "A responsive portfolio template built with Tailwind CSS",
    technologies: ["HTML", "Tailwind CSS", "JavaScript"],
    image_url: "/images/project2.jpg",
    github_url: "https://github.com/yourusername/portfolio-template",
    live_url: "https://yourportfolio.example.com"
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A CRUD application for managing daily tasks",
    technologies: ["Node.js", "Express", "PostgreSQL"],
    image_url: "/images/project3.jpg",
    github_url: "https://github.com/yourusername/task-app",
    live_url: "https://yourtaskapp.example.com"
  }
];

// Routes
app.get('/', (req, res) => {
  res.render('home', {
    name: "Rajendhar Are",
    tagline: "Full-stack developer creating digital experiences",
    logoUrl: "/assets/myLogo.svg",
    projects: projects  // Passing the mock data to your view
  });
});



app.listen(3000, () => console.log('Running on http://localhost:3000'));