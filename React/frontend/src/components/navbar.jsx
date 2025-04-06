// Navbar.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './navbar.css';

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions (e.g., clear tokens)
    console.log('logging out...')
    navigate('/');  // Navigate back to the login page
  };

  return (
    <nav className="navbar">
      <div className="logo">AdminForge</div>
      <div className="user-dropdown" onMouseEnter={() => setIsDropdownVisible(true)} onMouseLeave={() => setIsDropdownVisible(false)}>
        <span className="username">admin ▾</span>
        {isDropdownVisible && (
          <div className="dropdown-menu">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
