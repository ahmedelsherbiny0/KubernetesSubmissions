const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "log.txt");

app.get("/", (req, res) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Log file not found yet");
    }
    res.send(data);
  });
});
    
app.listen(port);
