const express = require('express');
const app = express();
const lessons = require('./public/lessons.json');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/lessons', (req, res) => {
  res.json(lessons);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});