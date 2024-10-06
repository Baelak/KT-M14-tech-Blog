const router = require('express').Router();
const { BlogPost } = require('../../models'); // Make sure to import the correct model
const withAuth = require('../../utils/auth'); // Authentication middleware

// CREATE a new blog post
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create({
      ...req.body,
      userId: req.session.userId, // Ensure you're using the correct session variable
    });
    res.status(201).json(newBlogPost); // Use 201 for resource creation
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'An error occurred while creating the blog post.' }); // Improved error message
  }
});

// Export the router
module.exports = router;
