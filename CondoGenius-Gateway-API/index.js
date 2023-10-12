const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();
const router = express.Router(); // Crie um objeto Router

const authController = require("./controllers/authController");

const authMiddleware = require("./middlewares/auth");

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  authMiddleware(req, res, next)
});

router.use("/login/", authController.login)
router.use("/user/register", authController.register)

router.use("/residents/", proxy("http://residents:7008/"));

app.use("/gateway", router)

app.listen(5000, () => {
  console.log("Gateway is Listening to Port 5000");
});