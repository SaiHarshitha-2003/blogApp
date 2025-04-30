import './Signup.css';
import React, {useState} from 'react';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup',{
        name: username,
        email,
        password,
      });
      alert('User signed up successfully');
      console.log('User signed up:',response.data);
    } catch (error) {
      if (error.response?.status === 409){
        alert('Email already exists. Try logging in.')
      }
      else {
        alert('Signup failed. Please try again.')
      }
      console.error('Signup error:',error);
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input 
        className="input-field" 
        value={username} 
        type="text" 
        placeholder="Username" 
        onChange={(e) => setUsername(e.target.value)}
        required />
        <input 
        className="input-field" 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required />
        <input 
        className="input-field" 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        required />
      <button type="submit" className="submit-btn">Sign Up</button>
    </form>
  </div>
  );
};

export default Signup;