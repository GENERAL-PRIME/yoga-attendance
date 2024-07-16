import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendanceCount = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [attendanceCount, setAttendanceCount] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students", err));
  }, []);

  const handleAttendanceCountFetch = () => {
    axios
      .get("http://localhost:5000/api/attendance/count", {
        params: {
          studentId: selectedStudent,
          month: selectedMonth,
          year: selectedYear,
        },
      })
      .then((res) => setAttendanceCount(res.data.count))
      .catch((err) => console.error("Error fetching attendance count", err));
  };

  return (
    <div>
      <h2>Check Attendance Count</h2>
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
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option value="">Select a month</option>
        {[...Array(12).keys()].map((i) => (
          <option key={i + 1} value={i + 1}>
            {new Date(0, i).toLocaleString("en-US", { month: "long" })}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        placeholder="Year"
      />
      <button onClick={handleAttendanceCountFetch}>Get Attendance Count</button>
      {attendanceCount !== null && (
        <div>
          <h3>Attendance Count: {attendanceCount}</h3>
        </div>
      )}
    </div>
  );
};

export default AttendanceCount;
