import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddStudentForm = () => {
  const [studentName, setStudentName] = useState("");
  const navigate = useNavigate();
  const handleAddStudent = () => {
    axios
      .post("http://localhost:5000/api/students", { name: studentName })
      .then((res) => {
        console.log("Student added", res.data);
        setStudentName("");
      })
      .catch((err) => console.error("Error adding student", err));
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>Back</button>
      <h2>Add New Student</h2>
      <input
        type="text"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Student Name"
      />
      <button onClick={handleAddStudent}>Add Student</button>
    </div>
  );
};

export default AddStudentForm;
