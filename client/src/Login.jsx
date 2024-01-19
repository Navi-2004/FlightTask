import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';

const Login = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const data = await response.json();
        const { userId } = data; 

        localStorage.setItem('userId', userId);
      console.log('Login successful');
      alert('Login successful')
        navigate('/flight')
    } else {
      console.error('Login failed');
        alert('Login failed')
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
