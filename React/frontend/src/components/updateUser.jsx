import React from 'react'
import Navbar from './navbar';
import './updateUser.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { updateUser } from '../api'; 

const UpdateUser = () => {

  const location = useLocation();
  const { user } = location.state;
  const navigate = useNavigate();

 const [formData, setFormData] = useState({
    username: user.username || '',
    email: user.email || '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const updatedUser = await updateUser(user.id, formData);
      console.log('Updating user..', updatedUser);
      alert('User updated successfully');
      navigate('/panel');
      
    } catch(error) {
      console.error('Error updating user', error);
      alert('Failed to update user. Please try again.');
    }
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