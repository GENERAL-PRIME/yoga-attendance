// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const moment = require("moment-timezone");
const pool = require("./db");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Get all students
app.get("/api/students", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM students");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching students", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add attendance
app.post("/api/attendance", async (req, res) => {
  const { studentId, date } = req.body;
  try {
    await pool.query(
      "INSERT INTO attendance (student_id, date) VALUES ($1, $2)",
      [studentId, date]
    );
    res.json({ message: "Attendance added successfully" });
  } catch (error) {
    console.error("Error adding attendance", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Add new student
app.post("/api/students", async (req, res) => {
  const { name } = req.body;
  try {
    const newStudent = await pool.query(
      "INSERT INTO students (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.json(newStudent.rows[0]);
  } catch (error) {
    console.error("Error adding student", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get attendance count for a student in a particular month
app.get("/api/attendance/count", async (req, res) => {
  const { studentId, month, year } = req.query;
  try {
    const { rows } = await pool.query(
      `SELECT COUNT(*) FROM attendance 
       WHERE student_id = $1 AND EXTRACT(MONTH FROM date) = $2 AND EXTRACT(YEAR FROM date) = $3`,
      [studentId, month, year]
    );
    res.json({ count: rows[0].count });
  } catch (error) {
    console.error("Error fetching attendance count", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get attendance records for all students in a particular month

app.get("/api/attendance/monthly", async (req, res) => {
  const { month, year } = req.query;
  try {
    const { rows } = await pool.query(
      `SELECT students.id, students.name, attendance.date
       FROM students
       LEFT JOIN attendance ON students.id = attendance.student_id
       AND EXTRACT(MONTH FROM attendance.date) = $1
       AND EXTRACT(YEAR FROM attendance.date) = $2
       ORDER BY students.name, attendance.date`,
      [month, year]
    );

    const formatDate = (date) => {
      if (!date) return null;
      const localDate = moment.utc(date).tz("Asia/Kolkata"); // Replace 'Your_Timezone' with your local timezone
      return localDate.format("DD-MM-YYYY");
    };

    const result = rows.map((row) => ({
      id: row.id,
      name: row.name,
      date: formatDate(row.date), // Format date to dd-mm-yyyy
    }));

    res.json(result);
  } catch (error) {
    console.error("Error fetching monthly attendance", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
