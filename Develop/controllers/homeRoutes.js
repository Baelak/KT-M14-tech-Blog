const router = require('express').Router();
const { BlogPost, User } = require('../models');

// Render the homepage with all blog posts
router.get('/', async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', { blogs, logged_in: req.session.logged_in });
  } catch (err) {
    console.error('Error fetching blogs:', err);
    res.status(500).json({ message: 'Failed to retrieve blog posts.' });
  }
});

// Render the user dashboard
router.get('/dashboard', async (req, res) => {
  if (!req.session.logged_in) {
    return res.redirect('/login');
  }

  try {
    const userBlogs = await BlogPost.findAll({
      where: { userId: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }],
    });

    const blogs = userBlogs.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', { blogs, logged_in: req.session.logged_in });
  } catch (err) {
    console.error('Error fetching user blogs:', err);
    res.status(500).json({ message: 'Failed to retrieve your blog posts.' });
  }
});

// Render the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  }
  res.render('login'); // Render login page
});

// Render the signup page
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    return res.redirect('/dashboard');
  }
  res.render('signup'); // Render signup page
});

// Export the router
module.exports = router;
