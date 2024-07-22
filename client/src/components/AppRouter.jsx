import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AttendanceCount from "./AttendanceCount";
import AttendanceForm from "./AttendanceForm";
import AttendanceTable from "./AttendanceTable";
import AddStudentForm from "./AddStudentForm";
import Home from "./Home/Home";

const AppRouter = () => (
  <Router>
    <div className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/attendance-count" element={<AttendanceCount />} />
        <Route path="/attendance-form" element={<AttendanceForm />} />
        <Route path="/attendance-table" element={<AttendanceTable />} />
        <Route path="/add-student" element={<AddStudentForm />} />
      </Routes>
    </div>
  </Router>
);

export default AppRouter;
