const router = require('express').Router();
const { Comment } = require('../../models'); // Import the Comment model
const withAuth = require('../../utils/auth'); // Authentication middleware

// CREATE a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      userId: req.session.userId, // Ensure you're using the correct session variable
    });
    res.status(201).json(newComment); // Use 201 for resource creation
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'An error occurred while creating the comment.' }); // Improved error message
  }
});

// Export the router
module.exports = router;
