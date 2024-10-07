const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // Reference the 'User' model
        key: 'id',
      },
    },
    blogPostId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blogPost', // Reference the 'BlogPost' model
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'comment',
    freezeTableName: true,
    underscored: true,
    timestamps: true,
  }
);

module.exports = Comment;
