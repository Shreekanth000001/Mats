import React, { useState, useEffect } from "react";
import "../index.css";

const Attendance = ({ classId }) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState("");

  const handleAttendance = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const fetchStudents = () => {
    fetch(`http://localhost:3000/students/class?classid=${classId}`)
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching classes:", error));
  };

  const formattedStudents = Object.keys(attendance).map((studentId) => ({
    studentId: studentId,
    status: attendance[studentId],
  }));

  const sendAttendance = () => {
    if (!selectedDate) {
      alert("Please select a date and time!");
      return;
    }

    const formattedStudents = Object.keys(attendance).map((studentId) => ({
      studentId: studentId,
      status: attendance[studentId],
    }));

    fetch("http://localhost:3000/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classId: classId,
        date: new Date(selectedDate).toISOString(),
        subject: "Sanskrit",
        students: formattedStudents,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => console.log("Attendance submitted:", data))
      .catch((error) => console.error("Error submitting attendance:", error));
  };

  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <div id="Class" className="w-full pl-4 pr-1.5 pt-9">
      <div className="">
        <div className="w-48">
          <label className="block text-gray-700">Select Date & Time:</label>
          <input
            type="datetime-local"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        {students.map((student) => (
          <div key={student._id} className="bg-white py-6 px-7.5 ">
            <div className="flex items-center">
              <div>{student.name}</div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleAttendance(student._id, "present")}
                  className={`px-4 py-2 m-1 ${
                    attendance[student._id] === "present"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Present
                </button>

                <button
                  onClick={() => handleAttendance(student._id, "absent")}
                  className={`px-4 py-2 m-1 ${
                    attendance[student._id] === "absent"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Absent
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={sendAttendance}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default Attendance;
