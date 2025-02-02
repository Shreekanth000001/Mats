import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../index.css";
import Profilepic from "../assets/profile.png";
import { Link } from "react-router-dom";

const Dashboard = ({ classdata, attendancedata }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const getLast7Days = () => {
    return [...Array(7)]
      .map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
      })
      .reverse();
  };

  const last7Days = getLast7Days();

  const getAttendanceRate = (classId, date) => {
    // Convert date to YYYY-MM-DD format for comparison
    const formattedDate = new Date(date).toISOString().split("T")[0];

    // Filter attendance records for the given class and date
    const attendanceForDay = attendancedata.filter(
      (entry) =>
        entry.classId === classId &&
        new Date(entry.date).toISOString().split("T")[0] === formattedDate
    );

    if (!attendanceForDay.length) return 0;

    // Sum up student counts across multiple sessions
    const totalPresent = attendanceForDay.reduce(
      (sum, entry) => sum + entry.students.length,
      0
    );
    const classStrength =
      classdata.find((cls) => cls._id === classId)?.strength || 1; // Avoid division by zero

    return ((totalPresent / classStrength) * 100).toFixed(1);
  };

  useEffect(() => {
    if (!classdata.length || !attendancedata.length) return;

    // Destroy previous chart instance before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: last7Days, // X-axis: Last 7 days
        datasets: classdata.map((classItem, index) => ({
          label: classItem.name,
          data: last7Days.map((date) => getAttendanceRate(classItem._id, date)),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderWidth: 2,
          fill: false,
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
        })),
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 100,
            title: {
              display: true,
              text: "Attendance Rate (%)",
            },
          },
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
        },
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
  }, [classdata, attendancedata]);

  return (
    <div id="Dashboard" className="w-full">
      <div className="hidden md:flex justify-end py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center">
          <span className="mr-4">Name</span>
          <img className="w-9 h-9 rounded-full" src={Profilepic} alt="ntg" />
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex justify-center md:w-[90%] md:ml-4 w-[600px] bg-white rounded-md shadow-md">
          <canvas ref={chartRef} className="min-h-[230px]"></canvas>
        </div>
      </div>
      <div className="grid grid-cols-1 w-[90%] mx-auto gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 mt-6">
        {classdata.map((classData) => (
          <div
            key={classData._id}
            className="rounded-sm border border-[#646464] bg-white py-2 px-2 md:py-6 md:px-7.5"
          >
            <Link to={`/class/${classData._id}`}>
              <div>
                <div>{classData.name}</div>
                <div className="mt-4 flex items-end justify-between">
                  <div className="flex flex-col">
                    <div className="font-bold">{classData.strength}</div>
                    <span className="text-[#65758C]">Total attendance</span>
                  </div>
                  <div>{getAttendanceRate(classData._id, last7Days[5])}%</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
