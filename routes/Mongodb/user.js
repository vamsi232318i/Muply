const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const path = require('path');

//Register Route
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password, genre } = req.body;

    const newUser = new User({ username, email, password, genre });

    await newUser.save();

    res.render('register_success', { username });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Error during registration');
  }
});

// Login Route
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || !(await user.comparePassword(password))) {
      return res.render('invalidCredentails', { Invalid: "Invalid Credentails" });
    }
    // Set session
    req.session.userId = user._id;
    req.session.user = user;
    console.log(req.session.user.username)
    // Save session and redirect
    req.session.save((err) => {
      if (err) {
        console.log('Error saving session:', err);
        return res.status(500).send('Error saving session');
      }
      return res.redirect('/user/dashboard');
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Error during login');
  }
});

// Dashboard Route
router.get('/dashboard', (req, res) => {
  if (!req.session.userId) {
    console.log("User not logged in, redirecting to login.");
    return res.redirect('/signin.html');
  }

  console.log("User logged in, rendering dashboard.");
  res.render('dashboard', { user: req.session.user });
});

//Discover route
router.get('/discover', (req, res)=>{

  if(!req.session.userId)
    return res.redirect('/signin.html')

  res.render('dashboard')
})

//Search Route
router.get('/search', (req, res)=>{

  if(!req.session.userId)
    return res.redirect('/signin.html')

  res.render('search')
})

//Artist Route
router.get('/artist', (req, res)=>{

  if(!req.session.userId)
    return res.redirect('/signin.html')

  res.render('artists')
})

//Profile Route
router.get('/profile', (req, res)=>{
  console.log(req.session)
  if(!req.session.userId)
    return res.redirect('/signin.html')

  res.render('profile', { user: req.session.user })
})

//Logout Route
router.get('/logout', (req, res)=>{

  req.session.destroy((error)=>{

    if(error){
      const err = new Error('Logout is not successful. Try after sometime!');
      err.status = 500;
      return next(err);
    }
    res.redirect('/signin.html');
  })
})


module.exports = router;
