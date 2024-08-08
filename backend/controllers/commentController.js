
const Comment = require('../models/commentModel');
const Blog = require('../models/postModel');
const User = require('../models/userModel');
exports.createComment = async (req, res) => {
  try {
    const { content, authorId, blogId } = req.body;
    const author = await User.findById(authorId);
    if (!author) {
      return res.status(400).json({ message: 'Author not found' });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(400).json({ message: 'Blog not found' });
    }

    const comment = new Comment({ content, author: authorId, blog: blogId });
    await comment.save();
   
    blog.comments.push(comment._id);
    await blog.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating comment', error });
  }
};
exports.getCommentsForBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blog: blogId }).populate('author');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};
exports.updateComment = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const comment = await Comment.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json({ message: 'Error updating comment', error });
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    await Blog.findByIdAndUpdate(comment.blog, { $pull: { comments: id } });

    res.status(200).json({ message: 'Comment deleted successfully', comment });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error });
  }
};
