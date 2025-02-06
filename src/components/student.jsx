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
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0] // Default: Today’s date
  );

  useEffect(() => {
    fetch(`https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/students/attendance?studentid=${studentId}`)
      .then((response) => response.json())
      .then((data) => setAttendances(data))
      .catch((error) => console.error("Error fetching attendance:", error));
  }, [studentId]);

  useEffect(() => {
    if (!attendances.length) return;
  
    if (attendedChartInstance.current) attendedChartInstance.current.destroy();
    if (absentChartInstance.current) absentChartInstance.current.destroy();
  
    const selectedDateObj = new Date(selectedDate);
  
    // Generate the 7-day range (including selected date)
    const dateRange = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(selectedDateObj);
      date.setDate(selectedDateObj.getDate() - i);
      return date.toISOString().split("T")[0]; // YYYY-MM-DD
    }).reverse();

  
    const groupedAttendance = {};
    const groupedAbsence = {};
    const subjectPresentCount = {}; 
  
    attendances.forEach((curr) => {
      const date = new Date(curr.date).toISOString().split("T")[0];
      const subject = curr.subject;
  
      if (dateRange.includes(date)) {
        if (curr.student.status === "present") {
          groupedAttendance[date] = groupedAttendance[date] || [];
          groupedAttendance[date].push(subject);
          subjectPresentCount[subject] = (subjectPresentCount[subject] || 0) + 1;
        } else if (curr.student.status === "absent") { // Explicitly check for "absent"
          groupedAbsence[date] = groupedAbsence[date] || [];
          groupedAbsence[date].push(subject);
        }
      }
    });
  
    const attendedLabels = dateRange;
    const attendedCounts = attendedLabels.map((date) => (groupedAttendance[date] || []).length);
    const absentLabels = dateRange;
    const absentCounts = absentLabels.map((date) => (groupedAbsence[date] || []).length);
  
    if (attendedChartRef.current) {
      const ctx = attendedChartRef.current.getContext("2d");
      attendedChartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: attendedLabels,
          datasets: [
            {
              label: "Subjects Attended",
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
                  return groupedAttendance[date] ? groupedAttendance[date].join(", ") : "";
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
  
    if (absentChartRef.current) {
      const ctx = absentChartRef.current.getContext("2d");
      absentChartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: absentLabels,
          datasets: [
            {
              label: "Subjects Absent",
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
                  return groupedAbsence[date] ? groupedAbsence[date].join(", ") : "";
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
  
    setSubjectCounts(subjectPresentCount);
  
    return () => {
      if (attendedChartInstance.current) attendedChartInstance.current.destroy();
      if (absentChartInstance.current) absentChartInstance.current.destroy();
    };
  }, [attendances, selectedDate]);
  

  return (
    <div id="Class" className="w-full pl-1 md:pl-4 pr-1.5 pt-4 md:pt-9">
      <div className="text-2xl font-bold flex flex-col">
        <span>{attendances?.[0]?.classname}</span>
        <span>{attendances?.[0]?.name}</span>
      </div>

      {/* Attended Chart */}
       {/* Date Selector */}
       <div className="w-48 mb-4">
        <label className="block text-gray-700">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div className="w-full overflow-x-auto">
      <div className="flex justify-center md:w-[90%] md:ml-4 w-[500px] bg-white rounded-md shadow-md">
        <canvas ref={attendedChartRef} className="min-h-[230px]"></canvas>
      </div></div>

      {/* Absent Chart */}
      <div className="w-full overflow-x-auto mt-2">
      <div className="flex justify-center md:w-[90%] md:ml-4 w-[500px] bg-white rounded-md shadow-md">
        <canvas ref={absentChartRef} className="min-h-[230px]"></canvas>
      </div></div>
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
