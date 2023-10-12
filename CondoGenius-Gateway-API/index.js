const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

const authMiddleware = require("./middlewares/auth");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  authMiddleware(req, res, next)
});

app.use("/", proxy("residents:7008"));

app.listen(5000, () => {
  console.log("Gateway is Listening to Port 5000");
});