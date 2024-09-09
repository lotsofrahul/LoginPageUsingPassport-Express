var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require("../routes/users");


//passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Middleware to check if user is loggedIn or not
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};

//endpoints

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/register', (req, res) => {
  let userdata = new User({
    username: req.body.username,
    secret: req.body.secret
  });

  User.register(userdata, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/dashboard');
    });
  });
});

router.get('/login', (req, res) => {
  res.redirect('/');
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect : '/dashboard',
    failureRedirect : '/login'
  })
);

router.get('/dashboard', isLoggedIn, (req, res) => {
  res.render('profile');
});

router.get('/logout', (req, res, next) => { 
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
