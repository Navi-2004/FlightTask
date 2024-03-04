import React, { useState } from 'react';
import './App.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import axios from './axiosConfig'

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate=useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post('/register', {
        username,
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        console.log('Registration successful');
        alert('Registration successful');
        Navigate('/login');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Registration failed');
    }
  };
  return (
    <div className="App">
      <Navbar />
      <h1>Register</h1>
      <label>Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleRegister}>Register</button>
      <h3>Already a User? <Link to="/login" className='link'>Login</Link> </h3>
      <Link to="/admin/login"><button>Admin Login</button></Link>
    </div>
  );
}

export default Register;
