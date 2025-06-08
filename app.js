const express = require('express');
const app = express();
const path = require('path');

// Config
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  console.log(projects); 
  res.render('home', {
    name: "Rajendhar Are",
    tagline: "Full-stack developer creating digital experiences",
    logoUrl: "/assets/myLogo.svg" // Add your logo here
  });
});

app.listen(3000, () => console.log('Running on http://localhost:3000'));