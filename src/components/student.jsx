import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Student = ({ studentId }) => {
  const [attendances, setAttendances] = useState([]);

  const fetchStudents = () => {
    fetch(`http://localhost:3000/students/attendance?studentid=${studentId}`)
      .then((response) => response.json())
      .then((data) => setAttendances(data))
      .catch((error) => console.error("Error fetching classes:", error));
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div id="Class" className="w-full pl-4 pr-1.5 pt-9">
      <div>Class name : {attendances?.[0]?.classname}</div>
      <div>Student name : {attendances?.[0]?.name}</div>
      <span>Subjects: </span>
      <div className="">
        {attendances.map((attendance) => (
          <div key={attendance._id} className="">
            <div>{attendance.date} </div>
            <div>{attendance.subject} 
              <span>Status : {attendance.student.status}</span> </div>
            <div className="mt-4 flex items-end justify-between">
            </div>
          </div>
        ))}

      </div></div>
  );
};

export default Student;
