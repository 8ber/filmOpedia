var express = require('express');
var router = express.Router();

const authBL = require('../models/authBL')
const titleBL = require('../models/titleBL');
const usersDAL = require('../DAL/users');
const adminBL = require('../models/adminBL');

router.get('/', async function(req, res, next) 
{
  if (req.session.sessionLogin && req.session.isAdmin)
  { 
    let users = await usersDAL.readFromFile()
    users = users.users;
    res.render('usersManagmentPage', {users});
  }
  else
  { 
    console.log("login failed - redirected back to the loginPage")
    res.redirect('/login');
  }
});

router.get('/del/:username', async function(req, res, next) 
{
  if (req.session.sessionLogin && req.session.isAdmin)
  { 
    await adminBL.delUser(req.params.username)
    res.redirect('/admin');
  }
  else
  { 
    console.log("login failed - redirected back to the loginPage")
    res.redirect('/login');
  }
});

router.get('/add', async function(req, res, next) 
{
  if (req.session.sessionLogin && req.session.isAdmin)
  { 
    res.render('userDataPage', {});
  }
  else
  { 
    console.log("login failed - redirected back to the loginPage")
    res.redirect('/login');
  }
});

router.post('/add', async function(req, res, next) 
{
  if (req.session.sessionLogin && req.session.isAdmin)
  { 
    await adminBL.addUser(req.body)
    res.redirect('/admin')  }
  else
  { 
    console.log("login failed - redirected back to the loginPage")
    res.redirect('/login');
  }
});

router.get('/update/:username', async function(req, res, next) 
{
  if (req.session.sessionLogin && req.session.isAdmin)
  { 
    let user = await adminBL.findUser(req.params.username)
    res.render('userDataPage', {user});
  }
  else
  { 
    console.log("login failed - redirected back to the loginPage")
    res.redirect('/login');
  }
});

router.post('/update', async function(req, res, next) 
{
  if (req.session.sessionLogin && req.session.isAdmin)
  { 
    await adminBL.updateUser(req.body)
    res.redirect('/admin')  }
  else
  { 
    console.log("login failed - redirected back to the loginPage")
    res.redirect('/login');
  }
});
module.exports = router;