import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(null); // Tracks the user ID being edited
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found.');
        return;
      }

      try {
        const response = await fetch('http://localhost:3001/api/users', {
          headers: {
            'x-auth-token': token,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users. You may not have admin privileges.');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditMode(user._id);
    setSelectedRole(user.role);
  };

  const handleCancel = () => {
    setEditMode(null);
    setSelectedRole('');
  };

  const handleSaveRole = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ role: selectedRole }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.msg || 'Failed to update role.');
      }

      const updatedUser = await response.json();

      // Update the user in the local state
      setUsers(users.map(user => (user._id === userId ? updatedUser : user)));
      setEditMode(null); // Exit edit mode
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token,
        },
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.msg || 'Failed to delete user.');
      }

      // Update the UI by filtering out the deleted user
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard - User Management</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>
                {editMode === user._id ? (
                  <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} className="role-select">
                    <option value="Candidate">Candidate</option>
                    <option value="Recruiter">Recruiter</option>
                    <option value="Admin">Admin</option>
                  </select>
                ) : (
                  user.role
                )}
              </td>
              <td>{user._id}</td>
              <td className="actions-cell">
                {editMode === user._id ? (
                  <>
                    <button onClick={() => handleSaveRole(user._id)} className="btn-save">Save</button>
                    <button onClick={handleCancel} className="btn-cancel">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)} className="btn-edit">Edit</button>
                    <button onClick={() => handleDelete(user._id)} className="btn-delete">Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;