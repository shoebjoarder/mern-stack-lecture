const express = require("express");
const todoRouter = require("./routes/todo-routes");
const errorHandler = require("./middleware/error-handler-middleware");
const connectDB = require("./database/connectDB");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
PORT = process.env.PORT | 3000;

const app = express();

app.use(express.json());

app.use(cors());

app.use("/todos", todoRouter);

app.use(errorHandler);

app.use(express.static("./client/dist"));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
