const express = require("express");
let app = express();
let port = process.env.PORT || 3000;
const fs = require("fs");
const path = require("path");

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "pingpong.txt");

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

let counter = 0;

app.get("/pingpong", (req, res) => {
  res.send(`pong ${counter++}`);
  fs.writeFileSync(filePath, `Ping / Pongs: ${counter}\n`);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
