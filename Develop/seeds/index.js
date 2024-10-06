const sequelize = require('../config/connection');
const { User, BlogPost, Comment } = require('../models');
const userData = require('./user-seeds');
const blogData = require('./blog-seeds');
const commentData = require('./comment-seeds');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    console.log('----- DATABASE SYNCED -----');

    // Seed Users
    await User.bulkCreate(userData);
    console.log('----- USERS SEEDED -----');

    // Fetch all user IDs for assigning to blog posts
    const users = await User.findAll();
    const userIds = users.map(user => user.id);

    // Seed Blog Posts using the blogData provided
    const blogPosts = blogData.map((blog, index) => ({
        ...blog,
        user_id: userIds[index % userIds.length], // Assign user IDs cyclically if there are more blogs than users
        createdAt: new Date(),
        updatedAt: new Date(),
    }));

    await BlogPost.bulkCreate(blogPosts);
    console.log('----- BLOG POSTS SEEDED -----');

    // Seed Comments using the commentData provided
    const comments = commentData.map(comment => ({
        ...comment,
        createdAt: new Date(),
        updatedAt: new Date(),
    }));

    await Comment.bulkCreate(comments);
    console.log('----- COMMENTS SEEDED -----');

    process.exit(0);
};

seedDatabase();
