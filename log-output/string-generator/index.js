const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "log.txt");

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

const randomString = uuidv4();

const writeLog = () => {
  const currentTimestamp = new Date().toISOString();
  const line = `${currentTimestamp}: ${randomString}\n`;

  fs.writeFileSync(filePath, line);
  console.log(line.trim());
};

writeLog();
setInterval(writeLog, 5000);
