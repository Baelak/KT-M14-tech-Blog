const { Comment } = require('../models');

// Seed comments
const commentData = [
  {
    comment: 'This is a great post! Thanks for sharing.',
    user_id: 2, // Lernantino
    blog_id: 1, // Why MVC is so important
  },
  {
    comment: 'I learned a lot from this post!',
    user_id: 3, // user123
    blog_id: 2, // Authentication vs. Authorization
  },
  {
    comment: 'Can you explain more about ORMs?',
    user_id: 1, // Xandromus
    blog_id: 3, // Object-Relational Mapping
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
