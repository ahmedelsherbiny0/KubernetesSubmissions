const express = require("express");
let app = express();
let port = process.env.PORT || 3000;

let counter = 0;

app.get("/pingpong", (req, res) => {
  res.send(`pong ${++counter}`);
});

app.get("/pongs", (req, res) => {
  res.send(`Ping / Pongs: ${counter}`);
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
