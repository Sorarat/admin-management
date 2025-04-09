import { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaComments } from 'react-icons/fa';
import './adminPanel.css';
import Navbar from './navbar';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, deleteUser } from '../api';

const AdminPanel = () => {
  const [users, setUsers ] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchedUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);

      } catch(error) {
        console.error("Failed to fetch users: ", error);
      }
    };

    fetchedUsers();

  }, []);
  
  const handleAddUser = () => {
    console.log('navigation to add  new user page ....')
    navigate('/add-user');
  };

  const handleUpdateUser = (user) => {
    console.log('navigating to update user page ....')
    navigate('/update-user', {state: {user}});
  }

  const handleDeleteUser = async (user) => {
    console.log('deleting user...')
    const isConfirmed = window.confirm(`Are you sure you want to delete user ${user.username}?`);
    if (isConfirmed) {
      try {
        await deleteUser(user.id);
        setUsers((prevUsers) => prevUsers.filter(u => u.id !== user.id)); 
        console.log(`Succesfully deleting ${user.username}`);
      } catch(error) {
        console.error("Error deleting user", error);
      }
    }
  };

  const navigateToChat = (user) => {
    navigate(`/chat/${user.id}`, { state: { username: user.username}});
  }

  // filter users based on search input
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  if (users.length === 0) {
    return <div>No users found.</div>
  }
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
                  {user.username !== sessionStorage.getItem('username') && (
                    <>
                      <FaEdit className="icon edit-icon" onClick={() => handleUpdateUser(user)} />
                      <FaTrash className="icon delete-icon" onClick={() => handleDeleteUser(user)} />
                      <FaComments className="icon chat-icon" onClick={() => navigateToChat(user)} />
                    </>
                  )}
                 
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
