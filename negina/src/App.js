import AdminDashboard from "./components/AdminDashboard";
import HomePage from "./Homepage";
import PrincipalDashboard from "./components/PrincipalDashboard";
import React from "react";
import ResultMaker from "./components/resultmaker";
import SignIn from "./components/SignIn";
import SignUp from "./SignUp";
import TeacherDashboard from "./components/TeacherDashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ManageClasses from "./components/ManageClasses";  // Import the new component
import FillForm from "./components/FillForm";
function App() {
  return (
    <Router>
      <Routes>
        {/* Route for HomePage */}
        <Route path="/" element={<HomePage />} />
        {/* Route for SignUp page */}
        <Route path="/signup" element={<SignUp />} />
        {/* Route for SignIn Page */}
        <Route path="/signin" element={<SignIn />} />
        {/* Route for AdminDashboard Page */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* Route for PrincipalDashboard Page */}
        <Route path="/principal-dashboard" element={<PrincipalDashboard />} />
        {/* Route for TeacherDashboard Page */}
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        {/* Route for ResultMaker Page */}
        <Route path="/results/:className" element={<ResultMaker />} />
        <Route path="/manage-classes" element={<ManageClasses />} />
        <Route path="/fill-form" component={FillForm} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
