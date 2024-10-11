import "./style.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ManageClasses from "./ManageClasses"; // Assuming it's in the same directory

function PrincipalDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [submittedData, setSubmittedData] = useState([]); // Store all submitted classes

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Handle submitted data from ManageClasses component
  const handleClassSubmit = (classData) => {
    setSubmittedData((prevData) => [...prevData, classData]);
  };

  return (
    <div className={`principal-dashboard ${isDarkMode ? "dark" : ""}`}>
      <header className="dashboard-header">
        <h1>Principal Dashboard</h1>
        <button onClick={toggleDarkMode} className="toggle-mode">
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <div className="dashboard-layout">
        <nav className="sidebar">
          <h2>Navigation</h2>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/signin" className="nav-link">Sign Out</Link>
          <Link to="/manage-students" className="nav-link">Manage Students</Link>
          <Link to="/view-reports" className="nav-link">View Reports</Link>
          <Link to="/settings" className="nav-link">Settings</Link>
        </nav>
        <div className="dashboard-content">
          <h2>Welcome, Principal!</h2>
          <div className="dashboard-buttons">
            <button className="dashboard-button">Manage Students</button>
            <button className="dashboard-button">View Staff Reports</button>
            <button className="dashboard-button">Settings</button>
          </div>

          <h3>Submitted Classes</h3>
          <div className="submitted-classes">
            {submittedData.length === 0 ? (
              <p>No data submitted yet.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Class Name</th>
                    <th>Teacher Name</th>
                    <th>Teacher Email</th>
                    <th>Subject</th>
                    <th>Students</th>
                  </tr>
                </thead>
                <tbody>
                  {submittedData.map((classData, index) => (
                    <tr key={index}>
                      <td>{classData.className}</td>
                      <td>{classData.teacherInfo.name}</td>
                      <td>{classData.teacherInfo.email}</td>
                      <td>{classData.teacherInfo.subject}</td>
                      <td>
                        {classData.students.map((student, i) => (
                          <div key={i}>
                            {student.name}: {student.marks}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Include the ManageClasses component and pass the handleClassSubmit method */}
      <ManageClasses onSubmit={handleClassSubmit} />
    </div>
  );
}

export default PrincipalDashboard;
