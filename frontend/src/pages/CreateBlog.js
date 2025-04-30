import { useState } from 'react';
import axios from 'axios';
import './CreateBlog.css';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.get('http://localhost:5000/api/blogs', { title, content }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Blog created!');
      setTitle('');
      setContent('');
    } catch (err) {
      console.error(err);
      alert('Failed to create blog.');
    }
  };

  return (
    <div className='create-blog'>
    <form onSubmit={handleSubmit}>
      <center><h2>Create Blog</h2></center>
      <input type="text" className='text' value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Title" />
      <textarea value={content} className='text' onChange={(e) => setContent(e.target.value)} required placeholder="Content" />
      <center>
      <button type="submit" className='submit-btn'>Publish</button>
      </center>
    </form>
    </div>
  );
}

export default CreateBlog;