import "./App.css";
import HomePage from "./components/HomePage";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import { Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-container">
          <a className="navbar-brand" href="/">
            Employee Management System
          </a>
        </div>
      </nav>
      <div className="content-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
