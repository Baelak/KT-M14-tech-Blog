const express = require('express');
const router = express.Router();

// Import individual route files
const apiRoutes = require('./api/inventoryRoutes'); // Handles blog post-related API routes
const homeRoutes = require('./homeRoutes'); // Handles homepage and blog post viewing
const userRoutes = require('./api/userRoutes'); // Handles user authentication routes

// Use the routes
router.use('/api', apiRoutes); // API routes for CRUD operations on blog posts
router.use('/', homeRoutes); // Routes for the homepage and viewing posts
router.use('/users', userRoutes); // Routes for user authentication (signup, login)

// Export the router
module.exports = router;
