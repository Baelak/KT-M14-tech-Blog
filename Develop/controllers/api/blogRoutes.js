// blogRoutes.js

const router = require('express').Router();
const { BlogPost, User, Comment } = require('../../models'); // Ensure User and Comment models are imported
const withAuth = require('../../utils/auth'); // Middleware to protect routes

// GET route to fetch a single blog post for viewing
router.get('/posts:id', async (req, res) => {  // Changed route to include /posts
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username'] }, // Include the username
                { model: Comment }
            ],
        });

        if (!blogPostData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        const blogPost = blogPostData.get({ plain: true });
        res.render('post', {  // Render the post.handlebars view (no .handlebars in the name)
            post: blogPost,
            comments: blogPost.Comments,  // Pass comments to the view
            logged_in: req.session.loggedIn // Ensure correct session variable
        });
    } catch (err) {
        console.error('Error fetching blog post:', err);
        res.status(500).json(err);
    }
});

// POST route to create a new blog post
router.post('/newpost', withAuth, async (req, res) => {
    console.log('Creating new post:', req.body); // Log the incoming request data
    try {
        const newPost = await BlogPost.create({
            title: req.body.title,
            content: req.body.content,
            userId: req.session.userId, // Associate the post with the logged-in user
        });

        res.status(201).json(newPost);
    } catch (err) {
        console.error('Error creating new blog post:', err);
        res.status(500).json({ message: 'Failed to create blog post.' });
    }
});

// PUT route to update an existing blog post
router.put('/posts/:id', withAuth, async (req, res) => {  // Ensure route matches fetch post
    try {
        const updatedPost = await BlogPost.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                    userId: req.session.userId, // Ensure the user owns the post
                },
            }
        );

        if (!updatedPost[0]) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(updatedPost);
    } catch (err) {
        console.error('Error updating blog post:', err);
        res.status(500).json(err);
    }
});

// DELETE route to delete a blog post
router.delete('/posts/:id', withAuth, async (req, res) => {  // Ensure route matches fetch post
    try {
        const postData = await BlogPost.destroy({
            where: {
                id: req.params.id,
                userId: req.session.userId, // Ensure the user owns the post
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        console.error('Error deleting blog post:', err);
        res.status(500).json(err);
    }
});

module.exports = router;
