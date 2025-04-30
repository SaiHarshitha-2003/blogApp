import { Link } from 'react-router-dom';
import './Navbar.css'; 
function Navbar() {
  return (
    <div className='nav'>
    <nav>
      <Link to="/" className='item'>Home</Link>
      <Link to="/create" className='item'>Create Blog</Link>
      <Link to="/login" className='item'>Login</Link>
      <Link to="/signup" className='item'>Signup</Link>
      <Link to="/edit/:id" className='item'>Edit Blog</Link>
    </nav>
    </div>
  );
}

export default Navbar;
