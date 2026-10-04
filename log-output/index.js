const { v4: uuidv4 } = require('uuid');

const randomString = uuidv4();

const logOutput = () => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}: ${randomString}`);
};

logOutput();
setInterval(logOutput, 5000);
