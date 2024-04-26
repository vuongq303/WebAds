const express = require("express");
const cors = require("cors");
const path = require("path");
require("../config/sql");

const userRouter = require("../router/user");
const requestRouter = require("../router/request");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/user", userRouter);
app.use("/request", requestRouter);
module.exports = app;
