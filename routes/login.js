var express = require('express');
var router = express.Router();

const BL = require('../models/authBL')

router.get('/', function(req, res, next) {
  if (!req.session.sessionLogin)
  { 
    res.render('login', {});
  }
  else
  {
    res.send(`Woops. Not enouth credits...
    Its all bout the money`)
  } 
});

router.post('/auth', async function(req, res, next) {
    let isFound = await BL.auth(req.body)
    if (isFound)
    {
      req.session.username = isFound.username;
      req.session.sessionLogin = true;
      req.session.isAdmin = isFound.isAdmin;  
      res.redirect("/menu")
    }
    // else
    // {
    //  // display error message?
    //  req.session.sessionLogin = false;
    //  res.render('login', {"status" : res.status(401)});
    // }
  });

module.exports = router;