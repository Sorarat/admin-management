import React from 'react'
import Navbar from './navbar';
import './updateUser.css';
import { useState, useEffect } from 'react';
import { useLocation} from 'react-router-dom';

const UpdateUser = () => {

  const location = useLocation();
  const { user } = location.state;

 const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
    password: '',
    phone: user.phone || ''
  });

  useEffect(() => {
    setFormData({
      username: user.username,
      email: user.email,
      phone: user.phone
    });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updaing user with data:', formData);
  };

  return (
    <div className='add-new-user'>
      <Navbar/>
      <div className="form-container">
        <h2>Update User</h2>
        <form onSubmit={handleSubmit} className="user-form">
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="create-user-button">Update</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateUser