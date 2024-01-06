// // src/Login.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     const response = await fetch('http://localhost:5000/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     if (response.ok) {
//       console.log('Login successful');
//       alert('Login successful')
//         navigate('/flight')
//     } else {
//       console.error('Login failed');
//         alert('Login failed')
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <label>Email:</label>
//       <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <br />
//       <label>Password:</label>
//       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <br />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;

// src/App.js
import React, { useState } from 'react';
import './App.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate=useNavigate();

  const handleRegister = async () => {
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      console.log('Registration successful');
        alert('Registration successful')
        Navigate('/login')

    } else {
      console.error('Registration failed');
    }
  };

  return (
    <div className="App">
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
      <h3>Already a User? <Link to="/login">Login</Link> </h3>
    </div>
  );
}

export default Register;
