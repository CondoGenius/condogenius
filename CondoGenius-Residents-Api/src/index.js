const express = require('express');
const app = express();
const port = 7008;

const router = require('./routes/Router');

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
