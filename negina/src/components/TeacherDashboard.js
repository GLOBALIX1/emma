import "./style.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function TeacherDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`teacher-dashboard ${isDarkMode ? "dark" : ""}`}>
      <header className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <button onClick={toggleDarkMode} className="toggle-mode">
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <div className="dashboard-layout">
        <nav className="sidebar">
          <h2>Navigation</h2>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/signin" className="nav-link">Sign Out</Link>
          <Link to="/Manage-Classes" className="nav-link">Manage Classes</Link>
          <Link to="/view-students" className="nav-link">View Students</Link>
          <Link to="/reports" className="nav-link">View Reports</Link>
        </nav>
        <div className="dashboard-content">
          <h2>Select a Class to Manage Results</h2>
          <div className="class-buttons">
            {["Form One Grammar", "Form One Commercial","Form One Technical", "Form Two Grammar", "Form Two Commercial","Form Two Technical", 
              "Form Three Grammar", "Form Three Commercial","Form Three Technical", "Form Four Science", "Form Four Arts","Form Four Technical", 
              "Form Five Science", "Form Five Arts","Form Five Technical", "Lower Sixth Science", "Lower Sixth Commercial", 
              "Lower Sixth Arts", "Lower Sixth Technical", "Upper Sixth Science", "Upper Sixth Commercial", "Upper Sixth Arts","Upper Sixth Technical"].map((form) => (
              <Link to={`/results/${form}`} key={form} className="class-button">
                {form}
              </Link>
            ))}
          </div>
          <h3>High School Series for Science</h3>
          <div className="upper-sixth-series">
            <h4>S1</h4>
            <p>Pure Mathematics(PMS/PMM), Chemistry, Physics</p>
            <h4>S2</h4>
            <p>Biology, Chemistry, Physics</p>
            <h4>S3</h4>
            <p>Biology, Chemistry, Mathematics</p>
            <h4>S4</h4>
            <p>Biology, Chemistry, Geology</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
