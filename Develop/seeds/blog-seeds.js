const { BlogPost } = require('../models');

// Seed blogs
const blogData = [
  {
    title: 'Why MVC is so important',
    content: 'MVC allows developers to maintain a true separation of concerns...',
    user_id: 1, // Xandromus
  },
  {
    title: 'Authentication vs. Authorization',
    content: 'There is a difference between authentication and authorization...',
    user_id: 2, // Lernantino
  },
  {
    title: 'Object-Relational Mapping',
    content: 'I have really loved learning about ORMs...',
    user_id: 3, // user123
  },
];

module.exports = blogData;
