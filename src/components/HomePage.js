import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/HomePage.css";

const HomePage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/employees/${id}`)
      .then(() => setEmployees(employees.filter((emp) => emp.id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Employee List</h1>
        <Link to="/add" className="add-button">
          Add Employee
        </Link>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              <td>{emp.department}</td>
              <td>
                <div className="action-buttons">
                  <button className="edit-button">
                    <Link to={`/edit/${emp.id}`} className="edit-link">
                      Edit
                    </Link>
                  </button>

                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {employees.length === 0 && (
        <p className="empty-message">No employees found.</p>
      )}
    </div>
  );
};

export default HomePage;
