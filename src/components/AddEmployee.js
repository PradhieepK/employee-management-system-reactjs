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
  const [errors, setErrors] = useState({
    name: "",
    age: "",
    position: "",
    department: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: "", age: "", position: "", department: "" };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    // Age validation
    if (
      !formData.age ||
      isNaN(formData.age) ||
      formData.age < 18 ||
      formData.age > 65
    ) {
      newErrors.age = "Age must be a number between 18 and 65.";
      valid = false;
    }

    // Position validation
    if (!formData.position.trim()) {
      newErrors.position = "Position is required.";
      valid = false;
    }

    // Department validation
    if (!formData.department.trim()) {
      newErrors.department = "Department is required.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post("http://localhost:5000/api/employees", formData)
        .then(() => navigate("/"))
        .catch((error) => console.error(error));
    }
  };

  return (
    <div className="add-employee-container">
      <h1 className="add-employee-title">Add Employee</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            required
          />
          {errors.name && <p className="error-text">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            onChange={handleChange}
            value={formData.age}
            required
          />
          {errors.age && <p className="error-text">{errors.age}</p>}
        </div>
        <div className="form-group">
          <label>Position</label>
          <input
            type="text"
            name="position"
            onChange={handleChange}
            value={formData.position}
            required
          />
          {errors.position && <p className="error-text">{errors.position}</p>}
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            onChange={handleChange}
            value={formData.department}
            required
          />
          {errors.department && (
            <p className="error-text">{errors.department}</p>
          )}
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
