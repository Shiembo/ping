import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password,
      });
      localStorage.setItem('token', response.data.token);
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      setLoading(false);
      console.error('Login error', error.response);
      if (error.response && error.response.data && error.response.data.non_field_errors) {
        setMessage('Login failed: ' + error.response.data.non_field_errors[0]);
      } else if (error.response && error.response.data) {
        setMessage('Login failed: ' + error.response.data.detail);
      } else {
        setMessage('Login failed: Unexpected error');
      }
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
