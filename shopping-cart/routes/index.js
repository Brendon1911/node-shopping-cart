var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var Product = require('../models/product');

var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find((err, products) => {
    if (err) {
      console.log(err);
    } else {
      var productChunks = [];
      var chunkSize = 3;
      for (var i = 0; i < products.length; i += chunkSize) {
        productChunks.push(products.slice(i, i + chunkSize));
      }
      res.render('shop/index', { title: 'Shopping-Cart', products: productChunks }); 
    }
  });
});

router.get('/user/signup', (req, res, next) => {
  var messages = req.flash('error');
  res.render('user/signup', { csrfToken: req.csrfToken, messages: messages, hasErrors: messages.length > 0 });
});

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/user/profile', (req, res, next) => {
  res.render('user/profile');
});

module.exports = router;
