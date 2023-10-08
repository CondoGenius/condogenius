const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());



app.use("/api/residents", proxy("http://localhost:7008"));

app.listen(5000, () => {
  console.log("Gateway is Listening to Port 5000");
});