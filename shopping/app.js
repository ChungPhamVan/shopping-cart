var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHandlebars = require('express-handlebars');
var session = require('express-session');
var passport = require('passport');
var connectFlash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);

require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});
require('./config/passport');

var indexRouter = require('./routes/index.route');
var userRouter = require('./routes/user.route');

var app = express();

// view engine setup
app.engine('.hbs', expressHandlebars({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({ 
  secret: 'mysupersecret', 
  resave: false, 
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(connectFlash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});
app.use('/', indexRouter);
app.use('/user', userRouter);

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
