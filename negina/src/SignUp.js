import "./App.css";
import React, { useState } from "react";

function SignUp() {
  const [userRole, setUserRole] = useState("");
  const [step, setStep] = useState(1);

  // Handles role selection (Admin, Principal, Teacher)
  const handleRoleSelection = (role) => {
    setUserRole(role);
    setStep(2);
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Sign up as ${userRole} successful!`);
    setStep(1);
  };

  return (
    <div className="signup-container">
      <div className={`form-step form-step-${step}`}>
        {/* Step 1: Choose role */}
        {step === 1 && (
          <div className="role-selection animated-slide-in">
            <h2>Select your role to Sign Up:</h2>
            <div className="role-buttons">
              <button onClick={() => handleRoleSelection("Admin")} className="role-btn admin-btn">
                Sign Up as Admin
              </button>
              <button onClick={() => handleRoleSelection("Principal")} className="role-btn principal-btn">
                Sign Up as Principal
              </button>
              <button onClick={() => handleRoleSelection("Teacher")} className="role-btn teacher-btn">
                Sign Up as Teacher
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Sign-up form */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="signup-form animated-slide-up">
            <h2>{`Sign Up as ${userRole}`}</h2>
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />

            <button type="submit" className="submit-btn">
              Complete Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SignUp;
