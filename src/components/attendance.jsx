import React, { useState, useEffect } from "react";
import "../index.css";

const Attendance = ({ subjects, classId }) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

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
      .catch((error) => console.error("Error fetching students:", error));
  };

  const sendAttendance = () => {
    if (!selectedDate || !selectedSubject) {
      alert("Please select a date and subject!");
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
        subject: selectedSubject, // Send the selected subject
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
      <div className="flex space-x-4 items-end">
        {/* Date Input */}
        <div className="w-48">
          <label className="block text-gray-700">Select Date & Time:</label>
          <input
            type="datetime-local"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        {/* Subject Dropdown */}
        <div className="w-48">
          <label className="block text-gray-700">Select Subject:</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="">-- Select Subject --</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Student Attendance List */}
      <div className="mt-6">
        {students.map((student) => (
          <div key={student._id} className="bg-white py-6 px-1 md:px-7.5 w-full">
            <div className="flex justify-between items-center">
              <div className="text-center">{student.name}</div>
              <div className="flex">
                <button
                  onClick={() => handleAttendance(student._id, "present")}
                  className={`px-2 py-2 rounded-2xl mr-1 ${
                    attendance[student._id] === "present"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Present
                </button>

                <button
                  onClick={() => handleAttendance(student._id, "absent")}
                  className={`px-2 py-2 rounded-2xl ${
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

      {/* Submit Button */}
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
