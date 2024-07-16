import React, { useState } from "react";
import axios from "axios";

const AttendanceTable = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const handleFetchAttendance = () => {
    axios
      .get("http://localhost:5000/api/attendance/monthly", {
        params: {
          month: selectedMonth,
          year: selectedYear,
        },
      })
      .then((res) => setAttendanceRecords(res.data))
      .catch((err) => console.error("Error fetching attendance records", err));
  };
  console.log(attendanceRecords);
  const groupAttendanceByStudent = (records) => {
    const groupedRecords = {};
    records.forEach((record) => {
      if (!groupedRecords[record.id]) {
        groupedRecords[record.id] = {
          name: record.name,
          dates: [],
        };
      }
      if (record.date) {
        groupedRecords[record.id].dates.push(record.date);
      }
    });
    return Object.values(groupedRecords);
  };

  const groupedRecords = groupAttendanceByStudent(attendanceRecords);

  return (
    <div>
      <h2>Attendance Records</h2>
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
      <button onClick={handleFetchAttendance}>Get Attendance Records</button>

      {groupedRecords.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Attendance Dates</th>
            </tr>
          </thead>
          <tbody>
            {groupedRecords.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>
                  {student.dates.length > 0
                    ? student.dates.join(", ")
                    : "No attendance"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceTable;
