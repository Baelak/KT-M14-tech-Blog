// const express = require('express');
// const router = express.Router();
// const { BlogPost, User, Comment } = require('../../models'); // Adjust according to your actual models

// // GET all blog posts
// router.get('/', async (req, res) => {
//     try {
//         const blogPosts = await BlogPost.findAll({
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username'],
//                 },
//                 {
//                     model: Comment,
//                     attributes: ['content', 'createdAt'],
//                     include: {
//                         model: User,
//                         attributes: ['username'],
//                     },
//                 },
//             ],
//         });
//         res.json(blogPosts);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // GET a single blog post by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const blogPost = await BlogPost.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username'],
//                 },
//                 {
//                     model: Comment,
//                     attributes: ['content', 'createdAt'],
//                     include: {
//                         model: User,
//                         attributes: ['username'],
//                     },
//                 },
//             ],
//         });

//         if (!blogPost) {
//             return res.status(404).json({ message: 'Post not found' });
//         }

//         res.json(blogPost);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // CREATE a new blog post
// router.post('/', async (req, res) => {
//     try {
//         const newPost = await BlogPost.create({
//             title: req.body.title,
//             content: req.body.content,
//             userId: req.session.userId, // Assuming you're using session for user ID
//         });
//         res.status(201).json(newPost);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

// // UPDATE a blog post
// router.put('/:id', async (req, res) => {
//     try {
//         const [updatedRows] = await BlogPost.update(req.body, {
//             where: {
//                 id: req.params.id,
//             },
//         });

//         if (updatedRows === 0) {
//             return res.status(404).json({ message: 'Post not found' });
//         }

//         res.json({ message: 'Post updated successfully' });
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

// // DELETE a blog post
// router.delete('/:id', async (req, res) => {
//     try {
//         const deletedRows = await BlogPost.destroy({
//             where: {
//                 id: req.params.id,
//             },
//         });

//         if (deletedRows === 0) {
//             return res.status(404).json({ message: 'Post not found' });
//         }

//         res.json({ message: 'Post deleted successfully' });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// module.exports = router;
