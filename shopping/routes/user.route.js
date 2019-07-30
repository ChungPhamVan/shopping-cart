var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
const { check, validationResult } = require('express-validator');
var controller = require('../controllers/user.controller');

router.use(csrf({ cookie: true }));
// chú ý thứ tự các router
router.get('/profile', controller.isLoggedIn, controller.profile);
router.get('/logout', controller.isLoggedIn, controller.logout);
router.use('/', controller.notLoggedIn, function(req, res, next) {
  next();
});

/* GET home page. */
router.get('/signup', controller.signup);
router.post('/signup', passport.authenticate('local.signup', {
  failureRedirect: '/user/signup',
  failureFlash: true
}), controller.url);

router.get('/signin', controller.signin);
router.post('/signin', passport.authenticate('local.signin', {
  failureRedirect: '/user/signin',
  failureFlash: true
}), controller.url);

module.exports = router;
