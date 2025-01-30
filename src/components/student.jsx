import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";

const Class = ({ studentId }) => {
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {attendances.map((attendance) => (
          <div key={attendance._id} className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div >
                <div>{attendance.name}</div>
                <div>{attendance.subject}</div>
                <div className="mt-4 flex items-end justify-between">

                </div>
              </div>

          </div>
        ))}

      </div></div>
  );
};

export default Class;
