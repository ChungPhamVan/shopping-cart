var productSeeder = require('../seed/product-seeder');
var Product = require('../models/products.model');
var Cart = require('../models/cart.model');
module.exports.index = async function(req, res, next) {
    var successMsg = req.flash('success')[0];
    var products = await Product.find();
  
    var productChunk = [];
    for(var i = 0; i < products.length; i += 3) {
      productChunk.push(products.slice(i, i + 3));
    }
    res.render('shop/index.view.hbs', {
      products: productChunk,
      successMsg: successMsg,
      noMessages: !successMsg
    });
};
module.exports.addToCart = function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {} );
  Product.findById(productId, function(err, product) {
    if(err) {
      res.redirect('/');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    res.redirect('/');
  });
};
module.exports.shoppingCart = function(req, res, next) {
  if(!req.session.cart) {
    return res.render('shop/shopping-cart.view.hbs', { products: null });
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shopping-cart.view.hbs', { products: cart.generateArray(), totalPrice: cart.totalPrice });
};
module.exports.checkout = function(req, res, next) {
  if(!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  console.log(errMsg);
  res.render('shop/checkout.view.hbs', { total: cart.totalPrice, errMsg: errMsg, noError: !errMsg });
};
module.exports.checkoutPost = function(req, res, next) {
  if(!req.session.cart) {
    return res.redirect('/shopping-cart');
  }
  var cart = new Cart(req.session.cart);
  const stripe = require("stripe")("sk_test_3g9HSLNBAXvBNqA53u08PLLR00QbzTWFGs");
  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test Charge"
  }, function(err, charge) {
      if(err) {
        req.flash('error', err.message);
        return res.redirect('/checkout');
      }
      req.flash('success', 'Successfully bought products !');
      req.session.cart = null;
      res.redirect('/');
  });
};
module.exports.isLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()) {
      return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
};
module.exports.reduce = function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {} );
  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
};
module.exports.removeItem = function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {} );
  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shopping-cart');
};