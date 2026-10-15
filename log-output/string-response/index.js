const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const directory = path.join(__dirname, "files");
const stringPath = path.join(directory, "log.txt");

app.get("/", async (req, res) => {
  try {
    const logData = fs.existsSync(stringPath)
      ? fs.readFileSync(stringPath, "utf8")
      : "";
    const response = await fetch("http://ping-pong-svc:2345/pongs");
    const pingData = await response.text();

    res.send(`${logData}<br/>${pingData}`);
  } catch (err) {
    res.status(500).send("Error reading data");
  }
});

app.listen(port);
