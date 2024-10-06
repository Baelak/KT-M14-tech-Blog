const express = require('express');
const router = express.Router();

// Import individual route files
const homeRoutes = require('./homeRoutes'); // Handles homepage and blog post viewing
const userRoutes = require('./api/userRoutes'); // Handles user authentication routes
const blogRoutes = require('./api/blogRoutes'); // Handles blog post-related API routes
const commentRoutes = require('./api/commentRoutes'); // Handles comment-related API routes

// Use the routes
router.use('/', homeRoutes); // Routes for the homepage and viewing posts
router.use('/api/users', userRoutes); // Routes for user authentication (signup, login)
router.use('/api/blogs', blogRoutes); // API routes for CRUD operations on blog posts
router.use('/api/comments', commentRoutes); // API routes for comment operations

// Export the router
module.exports = router;
