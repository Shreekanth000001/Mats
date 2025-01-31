import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Class = ({ classId }) => {
  const [students, setStudents] = useState([]);

  const fetchStudents = () => {
    fetch(`http://localhost:3000/students/class?classid=${classId}`)
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching classes:", error));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div id="Class" className="w-full pl-4 pr-1.5 pt-9">
      <Link to={`/attendance/${classId}`} className="flex justify-end w-full">
        <button className="bg-[#0059ff] text-white h-10 w-40 rounded-xl">
          Take Attendance
        </button>
      </Link>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {students.map((student) => (
          <div
            key={student._id}
            className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
          >
            <Link to={`/student/${student._id}`}>
              <div>
                <div>{student.name}</div>
                <div className="mt-4 flex items-end justify-between"></div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Class;
