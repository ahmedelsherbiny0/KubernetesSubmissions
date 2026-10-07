const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = process.env.PORT || 3000;

const randomString = uuidv4();
let currentTimestamp = new Date().toISOString();

const logOutput = () => {
  currentTimestamp = new Date().toISOString();
  console.log(`${currentTimestamp}: ${randomString}`);
};

logOutput();
setInterval(logOutput, 5000);

app.get("/", (req, res) => {
  res.send(`${currentTimestamp}: ${randomString}`);
});

app.get("/status", (req, res) => {
  res.send(`${currentTimestamp}: ${randomString}`);
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
