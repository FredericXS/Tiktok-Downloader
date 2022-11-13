const express = require('express');
const route = express.Router();
const downloadURL = require('./public/assets/js/download');

route.get('/', (req, res) => {
  res.render('index');
});

route.post('/', (req, res) => {
  let urlValue = req.body.url;
  urlValue = urlValue.match(/\d+/g);

  downloadURL(urlValue[0]);

  res.render('thanks');
});

module.exports = route;