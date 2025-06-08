const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projects');

router.get('/', projectController.projectsPage);

module.exports = router;

const { getProjects } = require('../database/queries');

router.get('/', async (req, res) => {
  try {
    const projects = await getProjects(); // Get from database
    res.render('home', { projects });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});