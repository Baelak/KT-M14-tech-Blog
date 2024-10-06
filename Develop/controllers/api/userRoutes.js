const router = require('express').Router();
const { User } = require('../../models'); // Import the User model
const withAuth = require('../../utils/auth'); // Authentication middleware

// SIGNUP a new user
router.post('/signup', async (req, res) => {
  try {
    // Check if password meets the required length
    if (req.body.password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    // Create a new user
    const newUser = await User.create(req.body); 
    req.session.save(() => {
      req.session.userId = newUser.id; // Store the user ID in the session
      req.session.loggedIn = true; // Set loggedIn to true
      res.status(201).json(newUser); // Respond with the new user and status 201
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'An error occurred while signing up. Please try again.' }); // Improved error message
  }
});

// LOGIN an existing user
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    
    if (!user || !(await user.checkPassword(req.body.password))) { // Ensure password comparison
      return res.status(400).json({ message: 'Incorrect username or password.' });
    }
    
    req.session.save(() => {
      req.session.userId = user.id; // Store the user ID in the session
      req.session.loggedIn = true; // Set loggedIn to true
      res.json({ user, message: 'You are now logged in!' }); // Respond with user info
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'An error occurred during login. Please try again.' }); // Improved error message
  }
});

// LOGOUT a user
router.post('/logout', withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end(); // Respond with no content on successful logout
    });
  } else {
    res.status(404).json({ message: 'No user is logged in.' }); // Improved response for no user session
  }
});

// Export the router
module.exports = router;
