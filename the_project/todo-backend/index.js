const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT;

app.use(express.json());

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const initDb = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      task VARCHAR(140) NOT NULL
    )`);
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

initDb();

app.get("/todos", async (req, res) => {
  const result = await pool.query("SELECT * FROM todos");
  res.json(result.rows);
});

app.post("/todos", async (req, res) => {
  const { task } = req.body;
  if (!task || typeof task !== "string" || task.trim().length === 0) {
    return res.status(400).json({ error: "Task cannot be empty" });
  }
  if (task.length > 140) {
    return res.status(400).json({ error: "Task cannot exceed 140 characters" });
  }

  const newTodo = await pool.query("INSERT INTO todos (task) VALUES ($1) RETURNING *", [task]);
  res.status(201).json(newTodo.rows[0]);
});

app.get("/", (req, res) => {
  res.send("Todo backend is running");
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
