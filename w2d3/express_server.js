require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

let urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get('/', (req, res) => {
  let templateVars = {urls: urlDatabase,
                      userName: req.cookies["userName"]};
  res.render('urls_index', templateVars);
});

app.get('/urls', (req, res) => {
  let templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.post("/urls", (req, res) => {
  // get longURL from urls_new and put it into the DB
  let longURL = (req.body.longURL.includes("http://")) 
              ? req.body.longURL 
              : "http://"+req.body.longURL; 
              
  let shortURL = getshortURL(longURL);
  urlDatabase[shortURL] = longURL;
  let templateVars = {urls: urlDatabase};

  // if inserting data has suceeded go to index with urlDatabase 
  if(urlDatabase.hasOwnProperty(shortURL)){
    res.render('urls_index', templateVars );
  }else{
  // else send failed message 
    res.send(`Failed to insert ${shortURL}` );
  }
});

app.post("/urls/:id/delete", (req, res) => {
  let id = req.params.id;
  if(delete urlDatabase[id]){
    res.render("urls_index", {urls: urlDatabase} );
  }else{
    res.send(`Failed to delete ${id}` );
  };  
});

app.get("/u/:shortURL", (req, res) => {
  let shortURL = req.originalUrl.substr(3);
  let longURL = urlDatabase[shortURL];
  res.redirect(longURL);
});

app.get("/urls/:id", (req, res) => {
  let templateVars = { shortURL: req.params.id , longURL: urlDatabase[req.params.id] };
  res.render("urls_show", templateVars);
});

app.post("/urls/:id", (req, res) => {
  let shortURL = req.params.id;
  let longURL = req.body.longURL;
  urlDatabase[shortURL] = longURL;
  res.render("urls_index", {urls: urlDatabase} );
});

app.post("/login", (req, res) => {
  res.cookie('userName', req.body.username);
  res.redirect("/");
});

app.post("/logout", (req, res) => {
  res.clearCookie('userName', { path: '/' });
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});


function getshortURL() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 6; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}