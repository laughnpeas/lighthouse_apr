'use strict';

const User    = require('../lib/user-helper');
const express = require('express');
const tweets  = express.Router();

module.exports = function(db) {

  tweets.get('/', function(req, res) {
    User.getTweets(db, (err, results) => {
      // simulate delay
      setTimeout(() => {
        return res.json(results);
      }, 300);
    });
  });

  tweets.post('/', function(req, res) {
    console.log('New Tweet, Body:', req.body);
    if (!req.body.text) {
      res.status(400);
      return res.send('{\'error\': \'invalid request\'}\n');
    }

    const user = req.body.user ? req.body.user : User.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };
    User.saveTweets(db, tweet, (err, result) => {
      res.json(result);
    });
  });

  return tweets;

};
