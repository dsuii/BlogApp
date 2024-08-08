
const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
router.post('/createcomment', commentController.createComment);
router.get('/blogs/:blogId/comments', commentController.getCommentsForBlog);
router.put('/comments/:id', commentController.updateComment);
router.delete('/comments/:id', commentController.deleteComment);

module.exports = router;
