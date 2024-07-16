// src/App.js
import React from "react";
import "./App.css";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceCount from "./components/AttendanceCount";
import AttendanceTable from "./components/AttendanceTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Yoga Attendance Tracker</h1>
        <AttendanceForm />
        <AttendanceCount />
        <AttendanceTable />
      </header>
    </div>
  );
}

export default App;
