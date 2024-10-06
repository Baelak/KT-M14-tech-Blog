const { User } = require('../models');
const bcrypt = require('bcrypt');

// Seed users
const userData = [
  {
    username: 'Xandromus',
    email: 'xandromus@example.com',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    username: 'Lernantino',
    email: 'lernantino@example.com',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    username: 'user123',
    email: 'user123@example.com',
    password: bcrypt.hashSync('password123', 10),
  },
];

module.exports = userData;
