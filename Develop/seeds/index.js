const sequelize = require('../config/connection');
const userData = require('./user-seeds'); // Import user data directly
const blogData = require('./blog-seeds'); // Import blog data directly
const commentData = require('./comment-seeds'); // Import comment data directly
const { User, BlogPost, Comment } = require('../models'); // Import models

const seedAll = async () => {
  try {
    // Sync the database
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    // Seed users first
    await User.bulkCreate(userData, { individualHooks: true });
    console.log('\n----- USERS SEEDED -----\n');

    // Then seed blog posts
    await BlogPost.bulkCreate(blogData);
    console.log('\n----- BLOGS SEEDED -----\n');

    // Finally, seed comments
    await Comment.bulkCreate(commentData);
    console.log('\n----- COMMENTS SEEDED -----\n');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    process.exit(0);
  }
};

// Call the seedAll function to initiate seeding
seedAll();
