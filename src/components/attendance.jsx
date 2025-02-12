import React, { useState, useEffect } from "react";
import "../index.css";

const Attendance = ({ subjects, classId }) => {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [numSubjects, setNumSubjects] = useState(1); // Default 1 subject
  const [selectedSubjects, setSelectedSubjects] = useState(Array(1).fill("")); // Default 1 empty selection

  const handleAttendance = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const fetchStudents = () => {
    fetch(`https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/students/class?classid=${classId}`)
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching students:", error));
  };

  const sendAttendance = () => {
    if (!selectedDate || selectedSubjects.some((subj) => subj === "")) {
      alert("Please select a date and complete all subject selections!");
      return;
    }

    const formattedStudents = Object.keys(attendance).map((studentId) => ({
      studentId: studentId,
      status: attendance[studentId],
    }));

    fetch("https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        classId: classId,
        date: new Date(selectedDate).toISOString(),
        subjects: selectedSubjects, // Send all selected subjects (duplicates allowed)
        students: formattedStudents,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        window.location.reload();
      })
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

        {/* Number of Subjects Input */}
        <div className="w-48">
          <label className="block text-gray-700">How many subjects?</label>
          <input
            type="number"
            min="1"
            max={subjects.length}
            value={numSubjects}
            onChange={(e) => {
              setNumSubjects(Number(e.target.value));
              setSelectedSubjects(Array(Number(e.target.value)).fill("")); // Reset subject selection
            }}
            className="border rounded p-2 w-full"
          />
        </div>
      </div>

      {/* Subject Selection Dropdowns */}
      {Array.from({ length: numSubjects }, (_, index) => (
        <div key={index} className="w-48 mt-4">
          <label className="block text-gray-700">Select Subject {index + 1}:</label>
          <select
            value={selectedSubjects[index] || ""}
            onChange={(e) => {
              const newSubjects = [...selectedSubjects];
              newSubjects[index] = e.target.value;
              setSelectedSubjects(newSubjects);
            }}
            className="border rounded p-2 w-full"
          >
            <option value="">-- Select Subject --</option>
            {subjects.map((subject, idx) => (
              <option key={idx} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
      ))}

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
