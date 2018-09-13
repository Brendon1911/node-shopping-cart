var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, (req, email, password, done) => {
  req.checkBody('email', 'Invalid email').isEmail();
  req.checkBody('password', 'Invalid password').isLength({ min: 4 });
  var errors = req.validationErrors();
  if (errors) {
    messages = [];
    errors.forEach((error) => {
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  User.findOne({'email': email}, (err, user) => {
    if (err) {
      return done(err);
    } else if (user) {
      return done(null, false, {message: 'Email is already in use.'});
    } else {
      var newUser = new User();
      newUser.email = email;
      newUser.password = newUser.encryptPassword(password);
      newUser.save((err, result) => {
        if (err) {
          return done(err);
        } else {
          return done(null, newUser);
        }
      });
    }
  });
}));