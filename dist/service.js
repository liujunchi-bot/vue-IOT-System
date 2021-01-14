var express = require('express');
var app = express();
const hostname = '101.37.169.73';
const port = 8001;
app.use(express.static('./'));
app.listen(port, hostname, () => {
  console.log(`Server is running `);
});