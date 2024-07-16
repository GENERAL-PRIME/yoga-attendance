import React, { useState } from "react";
import axios from "axios";

const AddStudentForm = ({ onStudentAdded }) => {
  const [studentName, setStudentName] = useState("");

  const handleAddStudent = () => {
    axios
      .post("http://localhost:5000/api/students", { name: studentName })
      .then((res) => {
        console.log("Student added", res.data);
        onStudentAdded(res.data);
        setStudentName("");
      })
      .catch((err) => console.error("Error adding student", err));
  };

  return (
    <div>
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
