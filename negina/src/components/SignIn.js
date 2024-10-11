import React from "react";
import { Link } from "react-router-dom";
import "./style.css"; // Assuming you have a CSS file for styles

function SignIn() {
  return (
    <div className="signin-container">
      <h1 className="signin-title">Sign In to School Management System</h1>
      <div className="role-selection">
        <Link to="/admin-dashboard">
          <button className="role-button">Admin</button>
        </Link>
        <Link to="/principal-dashboard">
          <button className="role-button">Principal</button>
        </Link>
        <Link to="/teacher-dashboard">
          <button className="role-button">Teacher</button>
        </Link>
      </div>
      <form className="signin-form">
        <input type="text" placeholder="Username" className="input-field" required />
        <input type="password" placeholder="Password" className="input-field" required />
        <button type="submit" className="signin-button">Sign In</button>
      </form>
      <div className="forgot-password">
        <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
      </div>
    </div>
  );
}

export default SignIn;
