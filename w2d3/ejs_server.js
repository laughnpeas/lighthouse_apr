require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

let urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.render('pages/index')
});

app.get("/urls.json", (req, res) => {
  res.send(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello, <b>World!</b> </body></html>");
});

app.listen(PORT, () => {
  console.log(`Example app is running on port: ${PORT}`);
});

