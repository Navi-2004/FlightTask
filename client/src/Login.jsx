import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import axios from './axiosConfig'
;
const Login = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const response = await axios.post('/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        const { userId } = response.data;
  
        localStorage.setItem('userId', userId);
        console.log('Login successful');
        alert('Login successful');
        navigate('/flight');
      } else {
        console.error('Login failed');
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert('Login failed');
    }
  };
  

  return (
    <div>
      <Navbar />
      <h1>Login</h1>
      <label>Email:</label>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Login</button>
      <p>Not a User? <Link to="/register" class="link">Register</Link></p>
    </div>
  );
};

export default Login;
