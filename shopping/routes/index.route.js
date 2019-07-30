var express = require('express');
var router = express.Router();
var productSeeder = require('../seed/product-seeder');
var Product = require('../models/products.model');
var controller = require('../controllers/shop.controller');

/* GET home page. */
router.get('/', controller.index);
router.get('/add-to-cart/:id', controller.addToCart);
router.get('/shopping-cart', controller.shoppingCart);
router.get('/checkout', controller.isLoggedIn, controller.checkout);
router.post('/checkout', controller.isLoggedIn, controller.checkoutPost);
router.get('/reduce/:id', controller.reduce);
router.get('/remove/:id', controller.removeItem);
module.exports = router;
