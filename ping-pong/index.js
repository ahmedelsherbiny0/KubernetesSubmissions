const express = require("express");
const { Pool } = require("pg");

let app = express();
let port = process.env.PORT;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const initDb = async () => {
  try {
    await pool.query(`                                                                                 
          CREATE TABLE IF NOT EXISTS pingpong (                                                            
            id INT PRIMARY KEY,                                                                            
            counter INT NOT NULL                                                                           
          );                                                                                               
        `);
    await pool.query(`                                                                                 
          INSERT INTO pingpong (id, counter) VALUES (1, 0)                                                 
          ON CONFLICT (id) DO NOTHING;                                                                     
        `);
    console.log("Database initialized");
  } catch (err) {
    console.error("Database initialization error:", err);
  }
};

initDb();

app.get("/pingpong", async (req, res) => {
  const result = await pool.query(
    "UPDATE pingpong SET counter = counter + 1 WHERE id = 1 RETURNING counter;",
  );
  res.send(`pong ${result.rows[0].counter}`);
});

app.get("/pongs", async (req, res) => {
  const result = await pool.query("SELECT counter FROM pingpong WHERE id = 1;");
  const count = result.rows[0]?.counter ?? 0;
  res.send(`Ping / Pongs: ${count}`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
