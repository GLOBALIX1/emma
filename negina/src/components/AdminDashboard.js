import "./style.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", role: "Principal", school: "ABC High School", active: true },
    { id: 2, name: "Jane Smith", role: "Teacher", school: "XYZ Academy", active: false },
    { id: 3, name: "Michael Brown", role: "Principal", school: "LMN School", active: true },
    { id: 4, name: "Emily Johnson", role: "Teacher", school: "DEF School", active: true },
  ]);
  
  const [editingUser, setEditingUser] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleActionClick = (action) => {
    setSelectedAction(action);
  };

  const handleStatusToggle = (id) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, active: !user.active } : user
    );
    setUsers(updatedUsers);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleSaveEdit = () => {
    setEditingUser(null); // Save functionality would go here
  };

  const handleSendFeedback = () => {
    // Logic for sending feedback
    alert(`Feedback sent: ${feedbackMessage}`);
    setFeedbackMessage('');
  };

  return (
    <div className={`admin-dashboard ${isDarkMode ? 'dark' : ''}`}>
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={toggleDarkMode} className="toggle-mode">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <div className="dashboard-layout">
        <nav className="sidebar">
          <h2>Navigation</h2>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/signin" className="nav-link">Sign Out</Link>
          <button className="nav-link" onClick={() => handleActionClick('Manage Users')}>Manage Users</button>
          <button className="nav-link" onClick={() => handleActionClick('View Reports')}>View Reports</button>
          <button className="nav-link" onClick={() => handleActionClick('Monitor Activities')}>Monitor Activities</button>
          <button className="nav-link" onClick={() => handleActionClick('Settings')}>Settings</button>
        </nav>

        <div className="dashboard-content">
          <h2>Welcome, Admin!</h2>

          {/* Manage Users Section */}
          {selectedAction === 'Manage Users' && (
            <div className="manage-users-section">
              <h2>Manage Users</h2>
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>School</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>{user.school}</td>
                      <td>{user.active ? 'Active' : 'Inactive'}</td>
                      <td>
                        <button onClick={() => handleStatusToggle(user.id)}>
                          {user.active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button onClick={() => handleEditUser(user)}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {editingUser && (
                <div className="edit-user-modal">
                  <h2>Edit User</h2>
                  <div className="edit-user-form">
                    <label>Name</label>
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    />
                    <label>Role</label>
                    <select
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    >
                      <option value="Teacher">Teacher</option>
                      <option value="Principal">Principal</option>
                    </select>
                    <label>School</label>
                    <input
                      type="text"
                      value={editingUser.school}
                      onChange={(e) => setEditingUser({ ...editingUser, school: e.target.value })}
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditingUser(null)}>Cancel</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Monitor Activities Section */}
          {selectedAction === 'Monitor Activities' && (
            <div className="monitor-activities-section">
              <h2>Monitor Activities</h2>
              <div className="monitor-overview">
                <h3>Principal Activities</h3>
                <ul>
                  <li>John Doe (ABC High School): Submitted new student records.</li>
                  <li>Michael Brown (LMN School): Uploaded end-of-term report.</li>
                </ul>

                <h3>Teacher Activities</h3>
                <ul>
                  <li>Jane Smith (XYZ Academy): Submitted grades for Form One.</li>
                  <li>Emily Johnson (DEF School): Added class schedules.</li>
                </ul>

                <div className="feedback-section">
                  <h3>Send Feedback</h3>
                  <textarea
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                    placeholder="Write your message here"
                  />
                  <button onClick={handleSendFeedback}>Send Feedback</button>
                </div>
              </div>
            </div>
          )}

          {/* View Reports Section */}
          {selectedAction === 'View Reports' && (
            <div className="view-reports-section">
              <h2>View Reports</h2>
              <ul className="reports-list">
                <li>User Activity Report</li>
                <li>System Performance Report</li>
                <li>Login/Logout Statistics</li>
                <li>Data Usage Overview</li>
                <li>Audit Log</li>
              </ul>
            </div>
          )}

          {/* Settings Section */}
          {selectedAction === 'Settings' && (
            <div className="settings-section">
              <h2>Settings</h2>
              <div className="settings-options">
                <label>
                  Dark Mode:
                  <button onClick={toggleDarkMode}>
                    {isDarkMode ? 'Disable' : 'Enable'}
                  </button>
                </label>
                <label>
                  Email Notifications:
                  <input type="checkbox" />
                </label>
                <label>
                  Backup Frequency:
                  <select>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </label>
                <label>
                  Maintenance Mode:
                  <input type="checkbox" />
                </label>
                <label>
                  Security Settings:
                  <select>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </label>
              </div>
            </div>
          )}

          {/* Default View: Recent Activities and Active Users */}
          {selectedAction === '' && (
            <>
              <div className="dashboard-buttons">
                <button className="dashboard-button" onClick={() => handleActionClick('Manage Users')}>Manage Users</button>
                <button className="dashboard-button" onClick={() => handleActionClick('View Reports')}>View Reports</button>
                <button className="dashboard-button" onClick={() => handleActionClick('Monitor Activities')}>Monitor Activities</button>
                <button className="dashboard-button" onClick={() => handleActionClick('Settings')}>Settings</button>
              </div>
              <h3>Recent Activities</h3>
              <ul className="activity-list">
                <li>Principal logged in at 10:00 AM</li>
                <li>Teacher submitted grades for Form One at 10:30 AM</li>
                <li>Admin updated user settings at 11:00 AM</li>
                <li>New student registered at 11:30 AM</li>
                <li>Teacher logged out at 12:00 PM</li>
              </ul>
              <h3>Active Users</h3>
              <table className="user-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>School</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((user) => user.active)
                    .map((user) => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{user.school}</td>
                        <td>Active</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
