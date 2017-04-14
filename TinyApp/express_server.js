require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const app = express();
const PORT = process.env.PORT || 8080;
const userData = require('./users');
const urlData = require('./urls');
var bcrypt = require('bcrypt');

app.set('view engine', 'ejs');
// app.use(cookieParser());
// Using cookie-session
app.use(cookieSession({
  name: 'session',
  keys: ['lighthouse'],
 
  // Cookie Options 
  maxAge: 24 * 60 * 60 * 1000 // 24 hours 
}));
app.use(bodyParser.urlencoded({extended: false}));
app.locals.urls = urlData;

//Landing page
app.get('/', (req, res) => {
  let user = null;
    if(req.session.user){
      user = userData.find( (data) => {
        return data.id == req.session.user.id;
      });
    }  
  res.render('urls_index', {title: "Tiny App", user: user});
});

app.get('/login', (req, res, next) => {
  res.render('login', {title: "Login"});
});

app.post("/login", (req, res, next) => {

  let loginUser = {
    username: req.body.username,
    password: req.body.password
  };

  let err = null;
  //Login Error Handling
  if(!loginUser.username){
    err = new Error('User name does not exists');
    err.statusCode = 403;
    return next(err);
  }

  if(!loginUser.password){
    err = new Error('User password does not exists');
    err.statusCode = 403;
    return next(err);
  }

  let user = userData.find( (data) => {
    return (data.username === loginUser.username) || null;
  });

  if(!user){
    err = new Error('User does not exists');
    err.statusCode = 403;
    return next(err);
  }
  if(user){
    bcrypt.compare(loginUser.password, user.password, function(err, result) {
      if (result) {
        req.session.user = user;
        res.redirect('/');
  }else{
        err = new Error('Password does not match');
        err.statusCode = 403;
        return next(err);
      }
    });
  }
});

app.post("/logout", (req, res) => {
  //after logout, clear cache with sessing signature
  res.clearCookie('session.sig', { path: '/' });
  res.redirect("/");
});

app.get("/register", (req, res) => {
  res.render("register");
});

//get maximum user id from user data and generate the next user id
let nextUserId = userData.map( (user) => { return user['id'];})
                  .reduce((a, b) => { return Math.max(a, b); });

app.post("/register", (req, res, next) => {
  let newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  };

  //check if provided information do exist in existing data
  let user = userData.find( (user) => { return user.email === newUser.email; }) || null;
  let err = new Error();
  if(user){
    err.message = 'You are trying to register with existing id';
    err.statusCode = 400;
    return next(err);
  }else{
    if(!newUser.username){
      err.message = `You don't provide any user id`;
      err.statusCode = 400;
      return next(err)
    }
    if(!newUser.password){
      err.message =`You don't provide any password`;
      err.statusCode = 400;
      return next(err)
    }
    if(!newUser.email){
      err.message =`You don't provide any email`;
      err.statusCode = 400;
      return next(err)
    }
    
    newUser['id'] = nextUserId += 1;

    if(userData.push(newUser)){
      req.session.user = newUser;
      res.redirect('/');
    }else{
      err.message =`Failed to register.`;
      err.statusCode = 400;
      return next(err)
    }
  }
});

app.get('/urls', (req, res) => {
  res.render("urls_index");
});

app.get("/urls/new", (req, res, next) => {
  //allow to add a URL after logging in
  if(req.session.user){
    res.render("urls_new");
  }else{
    let err = new Error(`You need to login to add a URL.`);
    err.statusCode = 400;
    return next(err);
  }
});

app.post("/urls", (req, res, next) => {
  // get longURL from urls_new and put it into the DB
  let longURL = (req.body.longURL.includes("http://")) 
              ? req.body.longURL 
              : "http://"+req.body.longURL; 
              
  let shortURL = getshortURL(longURL);
  let newUrlEntry = {id: req.session.user.id, shortURL: shortURL, longURL: longURL};
  if(urlData.push(newUrlEntry)){
    // if inserting data has suceeded go to index with urlDatabase 
    let newUrl = urlData.find( (entry) => {
      entry.shortURL == newUrlEntry.shortURL;
    });
    res.redirect('/');
  }else{
  // else send failed message 
    let err = new Error(`Failed to add a URL`);
    err.statusCode = 400;
    return next(err);
  }
});

app.post("/urls/:id", (req, res, next) => {
  let shortURL = req.params.id;
  let longURL = req.body.longURL;

  let newUrlEntry = {id: req.session.userId, shortURL: shortURL, longURL: longURL};
  if(urlData.push(newUrlEntry)){
    res.render('urls_index');
  }else{
    let err = new Error(`Failed to update URL ${id}`);
    err.statusCode = 400;
    return next(err);
  }
});

app.post("/urls/:id/delete", (req, res, next) => {
  let id = req.params.id;
  if(delete urlData[id]){
    res.locals.urls = urlData;
    res.redirect('/');
  }else{
    let err = new Error(`Failed to delete ${id}`);
    err.statusCode = 400;
    return next(err);
  };  
});

app.get("/u/:shortURL", (req, res) => {

  let shortURL = req.originalUrl.substr(3);
  let longURL = urlData[shortURL];
  res.redirect(longURL);
});

app.get("/urls/:id", (req, res) => {
  let shortURL = req.params.id;
  let selectedUrl = urlData.find( (url)=>{
    return url.shortURL == shortURL;
  });
  res.render("urls_show", { url: selectedUrl });
});

function getOwnUrl(id){
  return urlDatabase[id];
}

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
  res.render('error', {
    err: err.message || 'Unknow Error.',
    status: err.statusCode
  });
});