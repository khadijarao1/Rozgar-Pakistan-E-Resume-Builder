import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          onLogin(data.user);
        } else {
          setError('Invalid email or password. Please try again.');
        }
      })
      .catch(() => setError('Cannot connect to server. Make sure backend is running.'));
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to manage your professional resume</p>
        </div>
        <div className="login-body">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <button className="btn-login" onClick={handleLogin}>Sign In</button>
          {error && <div className="error-msg">{error}</div>}
          <div className="login-hint">
            <strong>Demo credentials:</strong><br />
            ali.raza@email.com / password123<br />
            fatima.khan@email.com / securepass
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
