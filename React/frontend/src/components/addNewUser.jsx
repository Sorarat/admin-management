import React from 'react'
import Navbar from './navbar';
import './addNewUser.css';
import { useState } from 'react';

const AddNewUser = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating user with data:', formData);
  };

  return (
    <div className='add-new-user'>
      <Navbar/>
      <div className="form-container">
        <h2>Add New User</h2>
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
          <button type="submit" className="create-user-button">Create User</button>
        </form>
      </div>
    </div>
  )
}

export default AddNewUser
