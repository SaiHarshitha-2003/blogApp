import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './BlogDetails.css';

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  const fetchBlog = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      console.log('Blog Data:', res.data);
      setBlog(res.data);
    } catch (err) {
      console.error('Error fetching blog:', err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBlog(id);
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Blog deleted!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to delete blog.');
    }
  };

  if (!blog) return <div>Loading...</div>;

  const currentUser = JSON.parse(localStorage.getItem('user'))?.id;

  return (
    <div className="blog-detail-container">
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <Link to="/" className="back-link">Back to Blogs</Link>
      {currentUser === blog.author && (
        <div>
          <Link className="edit" to={`/edit/${blog._id}`}>Edit</Link>&nbsp;&nbsp;
          <button className="button" onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
}

export default BlogDetails;
