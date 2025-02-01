import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";
import "../index.css";

const Class = ({ classId }) => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const fetchStudents = () => {
    fetch(`http://localhost:3000/students/class?classid=${classId}`)
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching classes:", error));

    fetch(`http://localhost:3000/classes/attendance?classid=${classId}`)
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error("Error fetching attendance:", error));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (!classes.length) return;

    // Count occurrences of each subject
    const subjectCounts = classes.reduce((acc, curr) => {
      acc[curr.subject] = (acc[curr.subject] || 0) + 1;
      return acc;
    }, {});

    const subjects = Object.keys(subjectCounts);
    const counts = Object.values(subjectCounts);

    // Destroy existing chart instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "polarArea",
      data: {
        labels: subjects, // Subjects as labels
        datasets: [
          {
            label: "No. of Classes Conducted",
            data: counts, // Subject counts as data
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(255, 206, 86, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(153, 102, 255, 0.5)",
              "rgba(255, 159, 64, 0.5)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [classes]);

  return (
    <div id="Class" className="w-full pl-4 pr-1.5 pt-9">
      <Link to={`/attendance/${classId}`} className="flex justify-end w-full">
        <button className="bg-[#0059ff] text-white h-10 w-40 rounded-xl">
          Take Attendance
        </button>
      </Link>

      <div className="w-full h-max md:h-96">
        <canvas ref={chartRef}></canvas>
      </div>

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
