import "./App.css";
import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="landing-container">
        <div className="welcome-section">
          <h1 className="welcome-message cute-text">
            Welcome Everyone to the School Management System
          </h1>
          <div className="button-group">
            <Link to="/SignUp">
              <button className="button signup cute-button">Sign Up</button>
            </Link>
            <Link to="/SignIn">
              <button className="button signin cute-button">Sign In</button>
            </Link>
          </div>
        </div>
        <div className="image-section">
          <img
            src="https://th.bing.com/th/id/R.283f730b4bbc0159aaf077d2739e53ca?rik=H5AvFhSi9BMyOw&pid=ImgRaw&r=0"
            alt="School"
            className="placeholder-image"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
