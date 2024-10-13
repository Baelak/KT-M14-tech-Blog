const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to render the new post creation form
router.get('/newpost', withAuth, (req, res) => {
  res.render('newpost', { logged_in: req.session.loggedIn });
});

// Route to handle the form submission and create a new blog post
router.post('/newpost', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.session.userId, // Associate the blog post with the logged-in user
    });

    res.status(201).json(newBlogPost); // Respond with the newly created blog post
  } catch (err) {
    console.error('Error creating new blog post:', err);
    res.status(500).json({ message: 'Failed to create blog post.' });
  }
});

module.exports = router;
