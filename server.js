const express = require('express');
const app = express();
const lessons = require('./public/lessons.json');
const path = require('path');
const fs = require('fs');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// GET endpoint for lessons
app.get('/lessons', (req, res) => {
  res.json(lessons);
});

// POST endpoint to add a new lesson
app.post('/lessons', (req, res) => {
  const newLesson = req.body;
  fs.readFile('./public/lessons.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading lessons data');
      return;
    }
    const lessons = JSON.parse(data);
    lessons.push(newLesson);
    fs.writeFile('./public/lessons.json', JSON.stringify(lessons, null, 2), 'utf8', (err) => {
      if (err) {
        res.status(500).send('Error updating lessons data');
        return;
      }
      res.status(201).send('Lesson added successfully');
    });
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});