// controllers/api/userRoutes.js

const router = require('express').Router();
const { User } = require('../../models'); // Import the User model
const withAuth = require('../../utils/auth'); // Authentication middleware

// SIGNUP a new user
router.post('/signup', async (req, res) => {
  try {
    if (req.body.password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    const newUser = await User.create(req.body); 
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.loggedIn = true;
      res.status(201).json(newUser);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while signing up. Please try again.' });
  }
});

// LOGIN an existing user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    
    if (!user || !(await user.checkPassword(req.body.password))) {
      return res.status(400).json({ message: 'Incorrect username or password.' });
    }
    
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.loggedIn = true;
      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during login. Please try again.' });
  }
});

// LOGOUT a user
router.post('/logout', withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: 'Logout failed. Please try again.' });
      } else {
        res.status(204).end(); // Successfully logged out
      }
    });
  } else {
    res.status(404).json({ message: 'No user is logged in.' });
  }
});

module.exports = router;
