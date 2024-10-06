const router = require('express').Router();
const { BlogPost, User } = require('../models'); // Import necessary models

// Render the homepage with all blog posts
router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({ include: [User] }); // Fetch all blog posts with associated user data
    const blogs = blogData.map((blog) => blog.get({ plain: true })); // Convert data to plain objects
    res.render('homepage', { blogs, logged_in: req.session.loggedIn }); // Render homepage with blogs and login status
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: 'An error occurred while fetching blogs.' }); // Improved error message
  }
});

// Render the user dashboard
router.get('/dashboard', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login'); // Redirect to login if user is not logged in
    return;
  }
  try {
    const userBlogs = await BlogPost.findAll({
      where: { userId: req.session.userId }, // Fetch blogs for the logged-in user
    });
    const blogs = userBlogs.map((blog) => blog.get({ plain: true })); // Convert data to plain objects
    res.render('dashboard', { blogs, logged_in: req.session.loggedIn }); // Render dashboard with user blogs
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: 'An error occurred while fetching your blogs.' }); // Improved error message
  }
});

// Export the router
module.exports = router;
