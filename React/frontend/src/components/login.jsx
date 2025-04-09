import { useState } from 'react';
import { useNavigate}from 'react-router-dom';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return false;
    }
    setError('');
    return true;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const formDetails = new URLSearchParams();
    formDetails.append('username', username);
    formDetails.append('password', password)

    try {
      const response = await fetch('http://localhost:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDetails,
      }); 

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('token', data.access_token)
        sessionStorage.setItem('username', username),
        navigate('/panel');
      }
      else {  
        const errorData = await response.json();
        setError(errorData.detail || 'Authentication failed!');
      }


    } catch(err) {
      setLoading(false);
      setError('An error occured. Please try again later');
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
                <label>Username:</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
              {error && <p style={{color: 'red'}}>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
