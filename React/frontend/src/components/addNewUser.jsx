import React from 'react'
import Navbar from './navbar';
import './addNewUser.css';
import { useState } from 'react';
import { createUser} from '../api';
import { useNavigate } from 'react-router-dom';

const AddNewUser = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: ''
  });

  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newUser = await createUser(formData);
      console.log ('Created user:', newUser);
      alert('User created successfully');
      navigate('/panel');

    } catch (error) {
      console.error('Error creating user', error);
      alert('Failed to create new user. Please try again.');
    }
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

          <button 
            type="submit" 
            className="create-user-button"
            >
              Create User
            </button>
        </form>
      </div>
    </div>
  )
}

export default AddNewUser
