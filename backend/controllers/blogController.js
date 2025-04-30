const Blog = require('../models/Blog');

// Create Blog
const createBlog = async (req, res) => {
  const { title, content } = req.body;

  const blog = await Blog.create({
    title,
    content,
    author: req.user._id,
  });

  res.status(201).json(blog);
};

// Get all blogs (with pagination)
const getBlogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const blogs = await Blog.find()
    .populate('author', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json(blogs);
};

// Get single blog
const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'name email');

  if (blog) {
    res.json(blog);
  } else {
    res.status(404).json({ message: 'Blog not found' });
  }
};

// Update blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(updatedBlog);
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete blog
const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' });
  }

  if (blog.author.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  await blog.remove();
  res.json({ message: 'Blog removed' });
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
