require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const app = express();
const PORT = process.env.PORT || 8080;
const users = require('./users');
var bcrypt = require('bcrypt');

app.set('view engine', 'ejs');
// app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ['lighthouse'],
 
  // Cookie Options 
  maxAge: 24 * 60 * 60 * 1000 // 24 hours 
}));
app.use(bodyParser.urlencoded({extended: false}));
/******* Hard coded Data********************/

let urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

/******* Hard coded Data********************/
let title = "***Tiny App***";
app.get('/', (req, res) => {
  let user = null;
  // if(req.cookies.user){
    if(req.session.userId){
    user = users.find( (user) => {
      return user.id == req.session.userId;
    });
  }  
  res.render('urls_index', {title: title, user: user, urls: urlDatabase});
});

app.get('/login', (req, res, next) => {
  res.render('login', {title: "Login", err: null});
});
app.post("/login", (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  let user = users.find( (user) => {
    return (user.username === username)? user.username === username : null;
  });
  let err = null;
  if(user === undefined){
    err = new Error('User name does not exists');
    err.statusCode = 400;
    return next(err);
    // res.redirect('/login');
  }else{
    bcrypt.compare(password, user.password, function(err, result) {
      if (result) {
        req.session.userId = user.id;
        // res.cookie('user', user);
        res.redirect('/');
      }else{
        err = new Error('Password does not match');
        err.statusCode = 400;
        return next(err);
        // res.redirect('/login');
      }
    });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie('user', { path: '/' });
  res.redirect("/");
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

app.get('/urls', (req, res) => {
  let templateVars = {urls: urlDatabase};
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  // if(req.cookies.user){
  if(req.session.userId){
    res.render("urls_new");
  }else{
    res.status(400).send( `<h4>You need to login to add a URL</h4> <a href="/">Go Back</a>` );
    // res.redirect('/');
  }
});

app.get("/", (req, res) => {
  res.render("");
});

let userIdArr = users.map( (arr) => {
  return arr['id'];
});
var nextUserId = userIdArr.reduce(function(a, b) {
    return Math.max(a, b);
});
app.post("/", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  let user = users.find( (user) => { return user.email === email; }) || null;
  if(user){
    res.status(400).send( `<h4>You are trying to  with existing id</h4> <a href="/">Go Back</a>` );
  }else{
    if(!username){
      res.status(400).send( `<h4>You don't provide any user id</h4> <a href="/">Go Back</a>` );
    }
    if(!password){
      res.status(400).send( `<h4>You don't provide any password </h4> <a href="/">Go Back</a>` );
    }
    if(!email){
      res.status(400).send( `<h4>You don't provide any email </h4> <a href="/">Go Back</a>` );
    }
    nextUserId += 1;
    newUser = {id: nextUserId, username: username, password: password, email: email};
    if(users.push(newUser)){
      res.cookie('user', newUser);
    }
    res.redirect('/');
  }

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
  // res.cookie('user', req.cookies['user'] || '');
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

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('login', {
    err: err.message || '',
    status: err.statusCode
  });
});