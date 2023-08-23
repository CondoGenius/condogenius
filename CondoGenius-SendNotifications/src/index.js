const express = require('express');
const app = express();
const port = 7007;

app.get('/', (req, res) => {
  res.send('Hello, world! Send Notification2');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
