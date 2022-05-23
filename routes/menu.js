var express = require('express');
var router = express.Router();

const authBL = require('../models/authBL')

router.get('/', async function(req, res, next) 
{
  let actions = await authBL.actionsLeft(req.session.username);
  if (req.session.sessionLogin && actions)
  { 
    res.render('menu', {"data" : {"actionsLeft" : actions, "username" : req.session.username, "isAdmin" : req.session.isAdmin}});
  }
  else
  { 
    console.log("login failed - redirected back to the loginPage")
    res.redirect('/login');
  }
});


module.exports = router;