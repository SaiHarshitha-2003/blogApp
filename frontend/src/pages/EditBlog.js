import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditBlog.css';
import {jwtDecode} from 'jwt-decode';

function EditBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log("Blog ID from URL:", id);
        console.log("Fetching from:", `http://localhost:5000/api/blogs/${id}`);
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        console.log("Fetched blog:", res.data);
        setBlog({
          title: res.data.title,
          content: res.data.content
        });
      } catch (err) {
          console.error('Failed to fetch blog:', err.response?.data || err.message);
        }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log('Token', token); 
      if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Current time in seconds
        if (decoded.exp < currentTime) {
          console.error('Token expired');
        }
      }
      if (!token) {
        console.error('Token is missing');
        return;
      }
      const updatedBlog = {
        title: blog.title,
        content: blog.content
      };
      if (!blog.title.trim() || !blog.content.trim()) {
        alert('Title and content cannot be empty.');
        return;
      }      
      console.log("Updating blog with:",updatedBlog);

      await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
        updatedBlog,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      console.log("Blog updated successfully");
      alert('Blog updated!');
      navigate(`/`);
    }
    catch (err) {
      console.error('Error updating blog:',err);
      alert('Failed to update blog');
    }
  };

  return (
    <div className='editblog'>
      <form onSubmit={handleSubmit}>
        <center>
          <h2>Edit Blog</h2>
        </center>
        <input
          type="text"
          name="title"
          className='text'
          value={blog.title}
          onChange={handleChange}
          required
          placeholder="Title"
        />
        <br />
        <textarea
          name="content"
          className='text'
          value={blog.content}
          onChange={handleChange}
          required
          placeholder="Content"
        />
        <br />
        <center>
          <button type="submit" className='submit-btn'>Update</button>
        </center>
      </form>
    </div>
  );
}

export default EditBlog;
