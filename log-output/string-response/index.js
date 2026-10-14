const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const directory = path.join("/", "usr", "src", "app", "files");
const stringPath = path.join(directory, "log.txt");
const pingpongPath = path.join(directory, "pingpong.txt");

app.get("/", (req, res) => {
  try {
    const logData = fs.existsSync(stringPath)
      ? fs.readFileSync(stringPath, "utf8")
      : "";
    const pingData = fs.existsSync(pingpongPath)
      ? fs.readFileSync(pingpongPath, "utf8")
      : "Ping / Pongs: 0\n";

    res.send(`${logData}<br/>${pingData}`);
  } catch (err) {
    res.status(500).send("Error reading files");
  }
});

app.listen(port);
