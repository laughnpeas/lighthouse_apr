require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const app = express();
const PORT = process.env.PORT || 3000;
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

app.use(function(req, res, next){
  res.locals.email = req.session.email;
  res.locals.urls = urlData;
  let userUrls = []; 
  if(req.session.userid){
    userUrls.push(urlData.find( (data) => {
      return (data.id === req.session.userid) || null;
    }) || null);
    res.locals.urls = userUrls;
  }
  next();
}); 

//Landing page
app.get('/', (req, res) => {
  res.render('urls_index', {title: "Tiny App"});
});

app.get('/login', (req, res, next) => {
  if(res.locals.email){
    res.redirect('/');
  }else{
    res.render('login');
  }
});

app.post("/login", (req, res, next) => {

  let loginUser = {
    email: req.body.email,
    password: req.body.password
  };

  let err = null;
  //Login Error Handling
  if(!loginUser.email){
    err = new Error('User email does not exists');
    err.statusCode = 403;
    return next(err);
  }

  if(!loginUser.password){
    err = new Error('User password does not exists');
    err.statusCode = 403;
    return next(err);
  }

  let user = userData.find( (data) => {
    return (data.email === loginUser.email) || null;
  });

  if(!user){
    err = new Error('User does not exists');
    err.statusCode = 401;
    return next(err);
  }else{
    bcrypt.compare(loginUser.password, user.password, function(err, result) {
      if (result) {
        req.session.userid = user.id;
        req.session.email = user.email;
        req.session.statusCode = 200;
        res.redirect('/');
      }else{
        err = new Error('Password does not match');
        err.statusCode = 401;
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
  if(res.locals.email){
    res.redirect('/');
  }else{
    res.statusCode = 200;
    res.render("register");
  }
});

//get maximum user id from user data and generate the next user id
let nextUserId = userData.map( (user) => { return user['id'];})
                  .reduce((a, b) => { return Math.max(a, b); });

app.post("/register", (req, res, next) => {
  let newUser = {
    email: req.body.email,
    password: req.body.password
  };
  //check if provided information do exist in existing data
  let email = userData.find( (user) => { return user.email === newUser.email; }) || null;
  let err = new Error();
  if(email){
    err.message = 'You are trying to register with existing id';
    err.statusCode = 400;
    return next(err);
  }else{
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

    var hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;
    newUser['id'] = nextUserId += 1;
    if(userData.push(newUser)){
      req.session.email = newUser.email;
      req.session.userid = newUser.id;
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
    let err = new Error(`You need to login to add a new URL.`);
    err.statusCode = 401;
    return next(err);
  }
});

app.post("/urls", (req, res, next) => {
  if(!res.locals.email){
    let err = new Error('You need to login');
    err.statusCode = 404;
    return next(err)
  }
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
    res.status(200);
    res.redirect('/');
  }else{
  // else send failed message 
    let err = new Error(`Failed to add a URL`);
    err.statusCode = 401;
    return next(err);
  }
});

app.post("/urls/:id", (req, res, next) => {
  let shortURL = req.params.id;
  let longURL = req.body.longURL;
  let userId = findIdByEmail(res.locals.email);
  if(!userId){
    let err = new Error(`You don't have right to update this URL.`);
    err.statusCode = 404;
    return next(err)
  }
  if(!userId){
    let err = new Error(`You have to login.`);
    err.statusCode = 401;
    return next(err)
  }
  if(userId !== findUrlId(shortURL)){
    let err = new Error(`You don't have right to update this URL.`);
    err.statusCode = 403;
    return next(err);
  }
  if(!shortURL){
    let err = new Error(`Unable to find the short link`);
    err.statusCode = 404;
    return next(err);
  }
  let newUrlEntry = {id: userId, shortURL: shortURL, longURL: longURL};
  if(urlData.push(newUrlEntry)){
    res.redirect('/');
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

app.get("/u/:shortURL", (req, res, next) => {
  // let shortURL = req.originalUrl.substr(3);
  if(!res.locals.email){
    return next(new Error('You need to login').status(404));
  }
  let longURL = urlData[shortURL];
  res.redirect(longURL);
});

app.get("/urls/:id", (req, res, next) => {
  let shortURL = req.params.id;
  if(!shortURL){
    let err = new Error('Failed to open the URL');
    err.statusCode = 404;
    return next(err);
  }
  if(!res.locals.email){
    let err = new Error(`You need to login`);
    err.statusCode = 401;
    res.redirect('/login');
  }
  if(findIdByEmail(res.locals.email) !== findUrlId(shortURL)){
    let err = new Error(`This url is not belong to you`);
    err.statusCode = 403;
    res.redirect('/login');
  }
  let selectedUrl = urlData.find( (url)=>{
    return url.shortURL == shortURL;
  });
  res.render("urls_show", { url: selectedUrl });
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
  if(err.status === 401){
    res.redirect('/login');
  }else{
    res.render('error', {
                          message: err.message || 'Unknown Erro', 
                          status: err.statusCode
                        });
    }
});

function findIdByEmail(email){
  let userid = '';
  for(user of userData){
    if(user.email === email){
      userid = user.id;
    }
  }
  return userid;
}

function findUrlId(item){
  let urlid = '';
  for(url of urlData){
    if(url.shortURL === item){
      urlid = url.id;
    }
  }
  return urlid;
}