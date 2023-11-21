const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const db = require("./models/");

const app = express();
const router = express.Router(); // Crie um objeto Router

const authController = require("./controllers/authController");

const authMiddleware = require("./middlewares/auth");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  authMiddleware(req, res, next)
});

router.post("/login/", authController.login)
router.post("/logout/", authController.logout)
router.get("/user/me", authController.me)
router.post("/user/register", authController.register)
router.get("/admin/:user_id", authController.getAdminByUserId)


router.post("/user/token/reset-password", authController.resetPassword)
router.post("/user/token/verify", authController.validateToken)
router.post("/user/reset-password", authController.updatePassword)

//COMPLAINTS
router.use("/api/complaints", proxy("http://complaints:7002"))

//DELIVERIES
router.use("/api/deliveries", proxy("http://deliveries:7003"))

//DELIVERIES
router.use("/api/checks", proxy("http://checks:7005"))

//RESERVATIONS
router.use("/api/reservations", proxy("http://reservations:7006"))

router.use("/hub_digital/", proxy("http://digital_hub:7004/"));
router.use("/residents/", proxy("http://residents:7008/"));
router.use("/meetings/", proxy("http://meetings:7009/"));
router.use("/condominium/", proxy("http://condominiums:7010/"));


app.use("/gateway", router)

app.listen(5000, () => {
  console.log("Gateway is Listening to Port 5000");
});