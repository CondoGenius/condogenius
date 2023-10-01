const express = require('express');
const app = express();
const port = 7008;
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:*"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("../src/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

require("../src/routes/Router")(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
