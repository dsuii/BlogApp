// controllers/blogController.js
const Blog = require('../models/postModel');
const User = require('../models/userModel');
const Category = require('../models/categoryModel');

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, authorId, categoryId, tags } = req.body;

    // Validate author and category
    const author = await User.findById(authorId);
    if (!author) {
      return res.status(400).json({ message: 'Author not found' });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const blog = new Blog({ title, content, author: authorId, category: categoryId, tags });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: 'Error creating blog', error });
  }
};

// Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author').populate('category');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
};

// Update a blog by ID
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const blog = await Blog.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ message: 'Error updating blog', error });
  }
};

// Delete a blog by ID
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully', blog });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
};
