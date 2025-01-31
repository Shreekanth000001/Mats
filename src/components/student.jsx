import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../index.css";

const Student = ({ studentId }) => {
  const [attendances, setAttendances] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:3000/students/attendance?studentid=${studentId}`)
      .then((response) => response.json())
      .then((data) => setAttendances(data))
      .catch((error) => console.error("Error fetching attendance:", error));
  }, [studentId]);

  useEffect(() => {
    if (!attendances.length) return;
  
    const ctx = chartRef.current.getContext("2d");
  
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
  
    // Sort the attendances by date
    const sortedAttendances = [...attendances].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  
    // Group the attendance records by date
    const groupedAttendance = sortedAttendances.reduce((acc, curr) => {
      const date = new Date(curr.date).toLocaleDateString(); // Group by date (formatted)
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(curr.subject); // Add subject to the group
      return acc;
    }, {});
  
    const labels = Object.keys(groupedAttendance); // Dates for X axis
    const subjectCounts = labels.map((date) => groupedAttendance[date].length); // Count of subjects for Y axis
  
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels, // X-axis = Dates
        datasets: [
          {
            label: "Number of Subjects Attended",
            data: subjectCounts, // Y-axis = Number of subjects attended
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const date = labels[tooltipItem.dataIndex]; // Get the date corresponding to the hovered bar
                return groupedAttendance[date].join(', '); // Join all subjects for that date
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1, // Ensures only whole numbers are shown
              precision: 0, // Removes decimal points
            },
            grid: {
              display: false, // Hides the horizontal lines
            },
            title: {
              display: true,
              text: "Subjects Attended",
            },
          },
          x: {
            title: {
              display: true,
              text: "Date",
            },
            grid: {
              display: false, // Hides the horizontal lines
            },
          },
        },
      },
    });
  
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [attendances]);
  

  return (
    <div id="Class" className="w-full pl-4 pr-1.5 pt-9">
      <div>Class name : {attendances?.[0]?.classname}</div>
      <div>Student name : {attendances?.[0]?.name}</div>
      <div className="w-full h-96">
        <canvas ref={chartRef}></canvas>
      </div>

      
    </div>
  );
};

export default Student;
