import React, { useState, useEffect } from "react";

const Addstudents = ({ classId }) => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", slno: "" });

  // Fetch students from the class
  const fetchStudents = async () => {
    try {
      const response = await fetch(`http://localhost:3000/students/class?classid=${classId}`);
      if (!response.ok) throw new Error("Failed to fetch students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Handle form inputs
  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  // Add student to class
  const addStudent = async () => {
    if (!newStudent.name || !newStudent.slno) {
      alert("Please enter both Name and Serial Number!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classid: classId,
          name: newStudent.name,
          slno: Number(newStudent.slno),
        }),
      });

      if (!response.ok) throw new Error("Failed to add student");

      const addedStudent = await response.json();
      setStudents([...students, addedStudent]); // Update UI
      setNewStudent({ name: "", slno: "" }); // Reset input fields
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="w-full p-6">
      <h2 className="text-xl font-semibold">Manage Students</h2>

      {/* Add Student Form */}
      <div className="flex space-x-3 mt-4">
        <input
          type="text"
          name="name"
          value={newStudent.name}
          onChange={handleInputChange}
          placeholder="Student Name"
          className="border p-2 rounded w-1/3"
        />
        <input
          type="number"
          name="slno"
          value={newStudent.slno}
          onChange={handleInputChange}
          placeholder="Serial Number"
          className="border p-2 rounded w-1/3"
        />
        <button onClick={addStudent} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Student
        </button>
      </div>

      {/* Students List */}
      {students.length > 0 ? (
        <ul className="mt-6 border rounded p-4">
          {students.map((student) => (
            <li key={student._id} className="p-2 border-b flex justify-between">
              {student.slno}. {student.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4">No students found.</p>
      )}
    </div>
  );
};

export default Addstudents;
