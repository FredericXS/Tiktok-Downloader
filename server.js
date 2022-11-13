const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const routes = require('./routes');

app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log('http://localhost:3000');
});