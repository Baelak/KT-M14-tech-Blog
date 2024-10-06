-- Title: Tech Blog Database Schema
-- Path: schema.sql

-- Create the database
CREATE DATABASE tech_blog_db;

-- Connect to the database
\c tech_blog_db;

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the blogs table
CREATE TABLE blogPosts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment TEXT NOT NULL,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    blog_post_id INT REFERENCES blogPosts(id) ON DELETE CASCADE, -- Correct reference to blogPosts
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
