import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Attendance = ({ classId }) => {
  const [students, setStudents] = useState([]);
  const [attendances, setAttendances] = useState([]);

  const fetchStudents = () => {
    fetch(`http://localhost:3000/students/class?classid=${classId}`)
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching classes:", error));
  }

  const sendAttendance = () => {
    fetch("http://localhost:3000/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classId: "6791bc432dfabe0290c5ba7e",
        date: "2025-01-26T09:30:00Z",
        subject: "Sanskrit",
        students: [
          { studentId: "6795b11a39a0887355fe6dc5", status: "absent" },
          { studentId: "6795b24c968cc2f82d8c1700", status: "present" },
        ],
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setAttendances(data))
      .catch((error) => console.error("Error fetching attendance:", error));
  };

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
            <div>
              {attendance.subject}
              <span>Status : {attendance.student.status}</span>{" "}
            </div>
            <div className="mt-4 flex items-end justify-between"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attendance;
