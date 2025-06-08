const { getProjects } = require('../database/queries');

exports.projectsPage = async (req, res) => {
  try {
    const projects = await getProjects();
    res.render('home', { projects });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).send('Error loading projects');
  }
};