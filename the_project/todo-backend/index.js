const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const todos = [];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { task } = req.body;
  if (!task || typeof task !== "string" || task.trim().length === 0) {
    return res.status(400).json({ error: "Task cannot be empty" });
  }
  if (task.length > 140) {
    return res.status(400).json({ error: "Task cannot exceed 140 characters" });
  }

  const newTodo = { task: task.trim() };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.get("/", (req, res) => {
  res.send("Todo backend is running");
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
