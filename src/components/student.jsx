import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../index.css";

const Student = ({ studentId }) => {
  const [attendances, setAttendances] = useState([]);
  const attendedChartRef = useRef(null);
  const absentChartRef = useRef(null);
  const attendedChartInstance = useRef(null);
  const absentChartInstance = useRef(null);
  const [subjectCounts, setSubjectCounts] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/students/attendance?studentid=${studentId}`)
      .then((response) => response.json())
      .then((data) => setAttendances(data))
      .catch((error) => console.error("Error fetching attendance:", error));
  }, [studentId]);

  useEffect(() => {
    if (!attendances.length) return;

    // Destroy previous charts before re-rendering
    if (attendedChartInstance.current) attendedChartInstance.current.destroy();
    if (absentChartInstance.current) absentChartInstance.current.destroy();

    const sortedAttendances = [...attendances].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Group attendance records by date and separate attended/absent subjects
    const groupedAttendance = {};
    const groupedAbsence = {};
    const subjectPresentCount = {}; // New: Store count of presents per subject

    sortedAttendances.forEach((curr) => {
      const date = new Date(curr.date).toLocaleDateString();
      const subject = curr.subject;

      if (curr.student.status === "present") {
        if (!groupedAttendance[date]) groupedAttendance[date] = [];
        groupedAttendance[date].push(subject);
        subjectPresentCount[subject] = (subjectPresentCount[subject] || 0) + 1;
      } else {
        if (!groupedAbsence[date]) groupedAbsence[date] = [];
        groupedAbsence[date].push(subject);
      }
    });

    // Prepare data for attended chart
    const attendedLabels = Object.keys(groupedAttendance);
    const attendedCounts = attendedLabels.map(
      (date) => groupedAttendance[date].length
    );

    // Prepare data for absent chart
    const absentLabels = Object.keys(groupedAbsence);
    const absentCounts = absentLabels.map(
      (date) => groupedAbsence[date].length
    );

    // Render attended chart
    if (attendedChartRef.current) {
      const ctx = attendedChartRef.current.getContext("2d");
      attendedChartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: attendedLabels,
          datasets: [
            {
              label: "Number of Subjects Attended",
              data: attendedCounts,
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const date = attendedLabels[tooltipItem.dataIndex];
                  return groupedAttendance[date].join(", ");
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1, precision: 0 },
              grid: { display: false },
              title: { display: true, text: "Subjects Attended" },
            },
            x: { title: { display: true, text: "Date" } },
          },
        },
      });
    }

    // Render absent chart
    if (absentChartRef.current) {
      const ctx = absentChartRef.current.getContext("2d");
      absentChartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: absentLabels,
          datasets: [
            {
              label: "Number of Subjects Absent",
              data: absentCounts,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  const date = absentLabels[tooltipItem.dataIndex];
                  return groupedAbsence[date].join(", ");
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1, precision: 0 },
              grid: { display: false },
              title: { display: true, text: "Subjects Absent" },
            },
            x: { title: { display: true, text: "Date" } },
          },
        },
      });
    }

    // Store subject present count in state
    setSubjectCounts(subjectPresentCount);

    return () => {
      if (attendedChartInstance.current)
        attendedChartInstance.current.destroy();
      if (absentChartInstance.current) absentChartInstance.current.destroy();
    };
  }, [attendances]);

  return (
    <div id="Class" className="w-full pl-4 pr-1.5 pt-9">
      <div className="text-2xl font-bold flex flex-col">
        <span>{attendances?.[0]?.classname}</span>
        <span>{attendances?.[0]?.name}</span>
      </div>

      {/* Attended Chart */}
      <div className="flex justify-center w-full h-max md:h-96">
        <canvas ref={attendedChartRef}></canvas>
      </div>

      {/* Absent Chart */}
      <div className="flex justify-center w-full h-96 mt-10">
        <canvas ref={absentChartRef}></canvas>
      </div>
      <div className="text-xl font-bold flex flex-col">
        <span>Subject-wise Present Count:</span>
        {Object.entries(subjectCounts).map(([subject, count]) => (
          <span key={subject}>
            {subject}: {count}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Student;
