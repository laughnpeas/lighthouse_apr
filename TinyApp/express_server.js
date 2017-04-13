require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
/******* Hard coded Data********************/

let urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = { 
  "stpnpark": {
    id: "stpnpark", 
    email: "stpnpark@gmail.com", 
    password: "stpn6594"
  },
 "seanypark": {
    id: "seanypark", 
    email: "stpnpark@live.com", 
    password: "sean6594"
  }
}

/******* Hard coded Data********************/

app.get('/', (req, res) => {
  let templateVars = {urls: urlDatabase,
                      username: req.cookies["username"]};
  res.render('urls_index', templateVars);
});

app.get('/urls', (req, res) => {
  let templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  let userID = req.body.userid;
  console.log(users.hasOwnProperty(userID));
  if(users.hasOwnProperty(userID)){
    res.status(400).send( `<h4>You are trying to register with existing id</h4> <a href="/register">Go Back</a>` );
  }
  if(userID === undefined || userID === ""){
    res.status(400).send( `<h4>You don't provide any user id</h4> <a href="/register">Go Back</a>` );
  }
   
  // res.redirect("/");
});

app.post("/urls", (req, res) => {
  // get longURL from urls_new and put it into the DB
  let longURL = (req.body.longURL.includes("http://")) 
              ? req.body.longURL 
              : "http://"+req.body.longURL; 
              
  let shortURL = getshortURL(longURL);
  urlDatabase[shortURL] = longURL;
  let templateVars = {urls: urlDatabase, username: req.cookies["username"]};

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
    // res.cookie('username', req.cookies['username'] || '');
    res.render("urls_index", {urls: urlDatabase, username: req.cookies['username'] || ''} );
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
  let shortURL = req.params.id;
  let templateVars = { shortURL:  shortURL, longURL: urlDatabase[shortURL] };
  res.render("urls_show", templateVars);
});

app.post("/urls/:id", (req, res) => {
  let shortURL = req.params.id;
  let longURL = req.body.longURL;
  urlDatabase[shortURL] = longURL;
  res.cookie('username', req.cookies['username'] || '');
  res.redirect("/");
});

app.post("/login", (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect("/");
});

app.post("/logout", (req, res) => {
  res.clearCookie('username', { path: '/' });
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