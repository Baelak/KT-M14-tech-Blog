const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

// Define associations between models here
BlogPost.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(BlogPost, {
  foreignKey: 'blogPostId',
  onDelete: 'CASCADE',
});

User.hasMany(BlogPost, {
  foreignKey: 'userId',
});

User.hasMany(Comment, {
  foreignKey: 'userId',
});

BlogPost.hasMany(Comment, {
  foreignKey: 'blogPostId',
});

module.exports = { User, BlogPost, Comment };
