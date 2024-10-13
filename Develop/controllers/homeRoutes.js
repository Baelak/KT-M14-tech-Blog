// controllers/homeRoutes.js

const router = require('express').Router();
const { BlogPost, User } = require('../models'); // Ensure User model is imported

// Render the homepage with all blog posts
router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']], // Order posts by creation date
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.loggedIn 
    });
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({ message: 'Failed to retrieve blog posts.' });
  }
});

// Render the user dashboard
router.get('/dashboard', async (req, res) => {
  // Check if the user is logged in
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }

  try {
    const userBlogs = await BlogPost.findAll({
      where: { userId: req.session.userId }, // Ensure userId from session is used correctly
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']], // Order posts by creation date
    });

    const blogs = userBlogs.map((blog) => blog.get({ plain: true }));

    // Render dashboard with user blogs
    res.render('dashboard', { 
      blogs, 
      logged_in: req.session.loggedIn 
    });
  } catch (err) {
    console.error('Error fetching user blogs:', err);
    res.status(500).json({ message: 'Failed to retrieve your blog posts.' });
  }
});

// Render the login page
router.get('/login', (req, res) => {
  // Redirect to dashboard if already logged in
  if (req.session.loggedIn) {
    return res.redirect('/dashboard');
  }
  res.render('login'); // Render login page
});

// Render the signup page
router.get('/signup', (req, res) => {
  // Redirect to dashboard if already logged in
  if (req.session.loggedIn) {
    return res.redirect('/dashboard');
  }
  res.render('signup'); // Render signup page
});

// Render the new post creation page
router.get('/newpost', (req, res) => {
  // Check if the user is logged in
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }
  res.render('newpost', { logged_in: req.session.loggedIn }); // Render newpost page
});

// Export the router
module.exports = router;
