var express = require('express');
var router = express.Router();
const TitleBL = require('../models/TitleBL')

const authBL = require('../models/authBL')

router.get('/', async function(req, res, next) 
{
  let actions = await authBL.actionsLeft(req.session.username);
  if (req.session.sessionLogin && actions)
  { 
    res.render('newmovie', {"data" : {"actionsLeft" : actions, "username" : req.session.username, "isAdmin" : req.session.isAdmin}});
  }
  else
  { 
    console.log("login failed - redirected back to the loginPage")
    res.redirect('/login');
  }
});

router.post('/', async function(req, res, next) {
  let actions = await authBL.UpdateActionsLeft(req.session.username);
  if (req.session.sessionLogin && actions)
  {
    let addNew = await TitleBL.addTitle(req.body)
    if (addNew)
    res.redirect('/menu')
    else {
      console.log("Oops.")
    }
  }
  else
  { 
    console.log("login failed - redirected back to the loginPage")
    res.redirect('/login');
  }
  });

module.exports = router;