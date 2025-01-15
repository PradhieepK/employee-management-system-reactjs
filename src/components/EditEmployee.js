import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/EditEmployee.css"; // Import the CSS file

const EditEmployee = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    position: "",
    department: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/employees/${id}`)
      .then((response) => setFormData(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/employees/${id}`, formData)
      .then(() => navigate("/"))
      .catch((error) => console.error(error));
  };

  return (
    <div className="edit-employee-container">
      <h1 className="edit-employee-title">Edit Employee</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Update
        </button>
        <Link to="/" className="home-link">
          Home Page
        </Link>
      </form>
    </div>
  );
};

export default EditEmployee;
