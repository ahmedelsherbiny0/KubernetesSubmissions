const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const directory = path.join(__dirname, "files");
const imagePath = path.join(directory, "image.jpg");

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

const TIME = 1000 * 60 * 10;

// func to return false if the image is older than 10 mins or not exist
const isImageOld = () => {
  if (!fs.existsSync(imagePath)) return true;
  const { mtimeMs } = fs.statSync(imagePath);
  return Date.now() - mtimeMs > TIME;
};

const fetchImage = async () => {
  try {
    const response = await fetch("https://picsum.photos/600");
    return Buffer.from(await response.arrayBuffer());
  } catch (err) {
    console.error("Failed to fetch image:", err);
  }
};

const saveImage = async (buffer) => {
  if (buffer) fs.writeFileSync(imagePath, buffer);
};

const initializeImage = async () => {
  if (isImageOld()) {
    const buffer = await fetchImage();
    saveImage(buffer);
  }
};

initializeImage();

setInterval(async () => {
  const buffer = await fetchImage();
  saveImage(buffer);
}, TIME);

app.get("/", (req, res) => {
  res.send(
    `
      <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;"> 
        <h1>ToDo App</h1>
        <img src="/image.jpg">
        <p>DevOps with Kubernetes 2026</p>
      </div>
    `,
  );
});

app.get("/image.jpg", (req, res) => {
  if (fs.existsSync(imagePath)) res.sendFile(imagePath);
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
