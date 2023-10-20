const express = require('express');
const app = express();
const port = 7009;
const cors = require("cors");

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

require("../src/routes/Router")(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
