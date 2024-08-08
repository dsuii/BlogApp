
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/postController');

router.post('/createblogs', blogController.createBlog);
router.get('/getblogs', blogController.getBlogs);
router.put('/blogs/:id', blogController.updateBlog); 
router.delete('/blogs/:id', blogController.deleteBlog); 

module.exports = router;
