const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const mongoose = require('mongoose');
const { verifyToken } = require('../middleware/authMiddleware');

// GET all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name email');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

// GET blog by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log("GET /blogs/:id", id);
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid blog ID format' });
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    console.error('Fetch Blog Error:', err.message);
    res.status(500).json({ message: 'Error fetching blog details' });
  }
});


// CREATE new blog
router.post('/api/blogs', async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId; // from verifyToken middleware
    const blog = new Blog({ title, content, author: userId });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE blog by ID
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      console.log("Missing fields");
      return res.status(400).json({ message: 'Title and content are required' });
    }
   
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE blog by ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog' });
  }
});

module.exports = router;
