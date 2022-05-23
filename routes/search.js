var express = require('express');
var router = express.Router();
const TitleBL = require('../models/TitleBL')
const apiDAL = require('../DAL/tvmaze')
const authBL = require('../models/authBL')

router.get('/', async function(req, res, next) 
{
  let actions = await authBL.actionsLeft(req.session.username);
  if (req.session.sessionLogin && actions)
  { 

    res.render('search', {"data" : {"actionsLeft" : actions, "username" : req.session.username, "isAdmin" : req.session.isAdmin}});
  }
  else
  { 
    console.log("login failed - redirected back to the loginPage")
    res.redirect('/login');
  }
}); 
 
router.post('/', async function(req, res, next) {
    let searchData = await TitleBL.searchTitle(req.body)
    let actions = await authBL.UpdateActionsLeft(req.session.username);
  if (req.session.sessionLogin && actions)
  {
    res.render('searchResults', {searchData});
  } 
  else
  { 
    console.log("login failed - redirected back to the loginPage")
    res.redirect('/login');
  }
  });

  router.get('/:id', async function(req, res, next) 
{ 
  if (req.params.id <= 250)
  {
    var oneMov = await apiDAL.getOneData(req.params.id)
    oneMov = oneMov.data
  }
  else 
  {
    var oneMov = await TitleBL.getOneFromFile(req.params.id)
  }
  let actions = await authBL.UpdateActionsLeft(req.session.username);
  if (req.session.sessionLogin && actions)
  { 
    res.render('searchResultsDet', {oneMov});
  }
  else
  { 
    console.log("login failed - redirected back to the loginPage")
    res.redirect('/login');
  }
}); 
module.exports = router;