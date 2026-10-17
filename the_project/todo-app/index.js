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
      <div style="font-family: Arial, sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh; width: 100vw; background-color: #f9f9f9;"> 
        <h1>Todo App</h1>
        <img src="/image.jpg" style="width: 300px; height: 300px; border-radius: 10px;">
        <div style="display: flex; gap: 10px; margin-top: 80px;"> 
          <input id="task-input" type="text" maxlength="140" placeholder="Enter a new todo (max 140 characters)" style="font-weight: bold; padding: 10px; width: 500px; border: 2px solid rgb(78, 173, 82); border-radius: 5px;">
          <button id="task-btn" onClick="handleSubmitTask()" style="font-weight: bold; padding: 10px 20px; background-color: rgb(78, 173, 82); color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
            Send
          </button>
        </div>
        <h2>Todos</h2>
        <div id="todos-container" style="display: flex; flex-direction: column; gap: 10px; width: 800px;"></div>
      </div>

      <script>
        const handleGetTasks = () => {
          fetch("/todos")
            .then((res) => res.json())
            .then((data) => {
              const todosContainer = document.getElementById("todos-container");
              todosContainer.innerHTML = "";
              data.forEach((todo) => {
                const todoDiv = document.createElement("div");
                todoDiv.style.cssText =
                  "width: 100%; background-color: #f0f0f0; font-weight: bold; padding: 10px 15px; border-left: 4px solid rgb(78, 173, 82); border-radius: 5px; box-sizing: border-box;";
                todoDiv.textContent = todo.task;
                todosContainer.appendChild(todoDiv);
              });
            })
            .catch((err) => console.error("Failed to fetch tasks:", err));
        };

        const handleSubmitTask = () => {
          const input = document.getElementById("task-input");
          const task = input.value.trim();
          if (task) {
            fetch("/todos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ task }),
            })
              .then((res) => {
                if (res.ok) {
                  input.value = "";
                  handleGetTasks();
                }
              })
              .catch((err) => console.error("Failed to post task:", err));
          }
        };

        document.getElementById("task-input").addEventListener("keydown", (e) => {
          if (e.key === "Enter") handleSubmitTask();
        });

        handleGetTasks();
      </script>
    `,
  );
});

app.get("/image.jpg", (req, res) => {
  if (fs.existsSync(imagePath)) res.sendFile(imagePath);
});

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});
