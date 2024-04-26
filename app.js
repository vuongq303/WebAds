const app = require("./config/index");
const http = require("http");
require("dotenv").config();

const server = http.createServer(app);
const port = process.env.port || 3000;

server.listen(port, () => {
  console.log("Server running -> " + port);
});
