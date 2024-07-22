import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <h1>Welcome to Yoga Attendance System</h1>
      <button onClick={() => navigate("/attendance-count")}>
        View Attendance Count
      </button>
      <button onClick={() => navigate("/add-student")}>Add New Student</button>
      <button onClick={() => navigate("/attendance-form")}>
        Record Today's Attendance
      </button>
      <button onClick={() => navigate("/attendance-table")}>
        View Monthly Attendance Records
      </button>
    </div>
  );
};

export default Home;
