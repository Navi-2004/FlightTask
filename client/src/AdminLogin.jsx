// AdminLogin.js
import React, { useState } from 'react';
import axios from './axiosConfig';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/admin/login', {
        username,
        password,
      });

      const adminId = response.data.adminId;
      console.log(adminId);

      // Store the admin ID in local storage
      localStorage.setItem('adminId', adminId);

      // Redirect to admin dashboard or desired page
      alert('Login successful')
      navigate('/admin/dashboard');
      
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
