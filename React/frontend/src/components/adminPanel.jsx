import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './adminPanel.css';
import Navbar from './navbar';

const AdminPanel = () => {
  const [search, setSearch] = useState('');
  const users = [
    { id: 1, username: 'johndoe', email: 'john@example.com', phone: '12345678' },
    { id: 2, username: 'janedoe', email: 'jane@example.com', phone: '87654321' },
  ];

  return (
    <div className="admin-panel">
     <Navbar/>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
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
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <FaEdit className="icon edit-icon" />
                  <FaTrash className="icon delete-icon" />
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
