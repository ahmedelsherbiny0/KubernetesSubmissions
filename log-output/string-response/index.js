const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const stringPath = path.join(__dirname, "files", "log.txt");
const configFilePath = path.join(__dirname, "config", "information.txt");

app.get("/", async (req, res) => {
  try {
    const configContent = fs.readFileSync(configFilePath, "utf8").trim();

    const envMessage = process.env.MESSAGE || "";

    const logData = fs.readFileSync(stringPath, "utf8").trim();

    let pingData = "";
    try {
      const response = await fetch("http://ping-pong-svc:2345/pongs");
      pingData = (await response.text()).trim();
    } catch (e) {
      console.error("Failed to fetch from ping-pong-svc:", e.message);
      pingData = "Ping / Pongs: 0";
    }

    res.send(
      `file content: ${configContent}<br/>env variable: MESSAGE=${envMessage}<br/>${logData}<br/>${pingData}`,
    );
  } catch (err) {
    res.status(500).send("Error reading data");
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
