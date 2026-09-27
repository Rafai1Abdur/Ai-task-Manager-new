const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

// Get tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add task
app.post('/tasks', (req, res) => {
  const newTask = {
    id: Date.now(),
    text: req.body.text
  };
  tasks.push(newTask);
  res.json(newTask);
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(task => task.id != req.params.id);
  res.json({ message: "Deleted" });
});

// AI Suggestion (Mock)
app.post('/ai', (req, res) => {
  const suggestion = "Try breaking your task into smaller steps!";
  res.json({ suggestion });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});