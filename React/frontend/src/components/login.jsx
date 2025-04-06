import { useState } from 'react';
import { useNavigate}from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
        console.log('Login:', { email, password });
        navigate('/panel'); 
    }
    
  };

  return (
    <div>
      <div className="split left">
        <div className="centered">
          <h1>Welcome Back</h1>
          <p>Log in to manage your admin dashboard</p>
        </div>
      </div>

      <div className="split right">
        <div className="centered">
          <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
