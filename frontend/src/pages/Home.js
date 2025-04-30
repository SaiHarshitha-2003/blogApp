import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
function Home() {
  const [blogs, setBlogs] = useState([]); // Ensure blogs is initialized as an empty array
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs`);
        setBlogs(res.data); // Ensure blogs is an array even if response is empty
        setTotalPages(res.data.totalPages || 1); // Default to 1 if totalPages is undefined
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="home-container">
  <center>
  <h1>All Blogs</h1>
  </center>
  {Array.isArray(blogs) && blogs.length > 0 ? (
    blogs.map((blog) => (
      <div key={blog._id} className="blog-card">
        <h2>{blog.title}</h2>
        <p>{blog.content.substring(0, 100)}...</p>
        <Link to={`/blog/${blog._id}`} className="read-more">Read More</Link>
      </div>
    ))
  ) : (
    <p>No blogs available.</p>
  )}
  <div className="pagination">
    {Array.from({ length: totalPages }, (_, i) => (
      <button key={i} onClick={() => setPage(i + 1)} disabled={page === i + 1}>
        {i + 1}
      </button>
    ))}
  </div>
</div>
  );
}

export default Home;
