import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './adminPanel.css';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [search, setSearch] = useState('');
  const users= [
    { id: 1, username: 'johndoe', email: 'john@example.com', phone: '12345678' },
    { id: 2, username: 'janedoe', email: 'jane@example.com', phone: '87654321' },
    { id: 3, username: 'harryp2', email: 'harry@example.com', phone: '5467657' },
    { id: 4, username: 'ronw23', email: 'ron@example.com', phone: '34453668' },
    { id: 5, username: 'hermioneg54', email: 'hermione@example.com', phone: '45465745' },
    { id: 6, username: 'dracom3', email: 'dracom3@example.com', phone: '345439605' },
  ];

  const navigate = useNavigate();
  
  const handleAddUser = () => {
    console.log('navigation to add  new user page ....')
    navigate('/add-user');
  };

  const handleUpdateUser = (user) => {
    console.log('navigating to update user page ....')
    navigate('/update-user', {state: {user}});
  }

  const handleDeleteUser = (user) => {
    console.log('deleting user...')
    const isConfirmed = window.confirm(`Are you sure you want to delete user ${user.username}?`);
    if (isConfirmed) {
      console.log(`User ${user.username} is deleted.`);
    }
  };

  // filter users based on search input
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-panel">
     <Navbar/>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users by username or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className='search-button'>Search</button>
      </div>

      <div className='add-user-container'>
        <button className='add-user-button' onClick={handleAddUser}>Add new user</button>
      </div>

      {/* User Table */}
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <FaEdit className="icon edit-icon" onClick={() => handleUpdateUser(user)} />
                  <FaTrash className="icon delete-icon" onClick={() => handleDeleteUser(user)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
