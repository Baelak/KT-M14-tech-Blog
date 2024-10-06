const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {}

BlogPost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Reference the 'User' model
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'blogPost',
    freezeTableName: true,
    underscored: true,
    timestamps: true,
  }
);

module.exports = BlogPost;
