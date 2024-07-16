// src/components/AttendanceForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddStudentForm from "./AddStudentForm";

const AttendanceForm = () => {
  const [students, setStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get("http://localhost:5000/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students", err));
  };

  const handleAttendanceSubmit = () => {
    axios
      .post("http://localhost:5000/api/attendance", {
        studentId: selectedStudent,
        date: selectedDate,
      })
      .then((res) => console.log("Attendance submitted", res.data))
      .catch((err) => console.error("Error submitting attendance", err));
  };

  const handleStudentAdded = (newStudent) => {
    setStudents((prevStudents) => [...prevStudents, newStudent]);
  };

  return (
    <div>
      <h2>Record Attendance</h2>
      <select
        value={selectedStudent}
        onChange={(e) => setSelectedStudent(e.target.value)}
      >
        <option value="">Select a student</option>
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.name}
          </option>
        ))}
      </select>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
      <button onClick={handleAttendanceSubmit}>Submit Attendance</button>
      <AddStudentForm onStudentAdded={handleStudentAdded} />
    </div>
  );
};

export default AttendanceForm;
