var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

let authBL = require('./models/authBL')
var newMovieRouter = require('./routes/newmovie')
var loginRouter = require('./routes/login');
var menuRouter = require('./routes/menu');
var searchRouter = require('./routes/search');
var adminRouter = require('./routes/admin');

// clearing user credits once 24hours against jFile
setInterval(authBL.clearUserActions, 1000 * 60 * 60 * 24)



var app = express();
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false,
  maxAge: 86400000}
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/login', loginRouter);
app.use('/menu', menuRouter);
app.use('/addmovie', newMovieRouter);
app.use('/search', searchRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
