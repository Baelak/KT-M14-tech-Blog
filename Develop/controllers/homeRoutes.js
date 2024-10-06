const router = require('express').Router();
const { Blog, Comment, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({ include: [User] });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', { blogs, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  try {
    const userBlogs = await Blog.findAll({
      where: { user_id: req.session.user_id },
    });
    const blogs = userBlogs.map((blog) => blog.get({ plain: true }));
    res.render('dashboard', { blogs, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
