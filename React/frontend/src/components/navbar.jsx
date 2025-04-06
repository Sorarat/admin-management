import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './navbar.css';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="logo">AdminForge</div>
      <div className="user-dropdown">
        <span className="username" onClick={() => setShowDropdown(!showDropdown)}>
          admin ▾
        </span>
        {showDropdown && (
          <div className="dropdown-menu">
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
