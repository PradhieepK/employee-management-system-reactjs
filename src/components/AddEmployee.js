import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddEmployee.css"; // Import the CSS file

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    position: "",
    department: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/employees", formData)
      .then(() => navigate("/"))
      .catch((error) => console.error(error));
  };

  return (
    <div className="add-employee-container">
      <h1 className="add-employee-title">Add Employee</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" name="age" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Position</label>
          <input type="text" name="position" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Employee
        </button>
        <Link to="/" className="home-link">
          Home Page
        </Link>
      </form>
    </div>
  );
};

export default AddEmployee;
