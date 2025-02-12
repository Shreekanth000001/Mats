import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Link } from "react-router-dom";

const Class = ({ classId }) => {  // ⬅️ Make sure the function starts here

  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [classname, setClassname] = useState("");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const classid = sessionStorage.getItem("classid");

  const fetchStudents = async () => {
    try {
      const studentsResponse = await fetch(
        `https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/students/class?classid=${classId}`
      );
      const studentsData = await studentsResponse.json();
      console.log("Fetched Students Data:", studentsData);
      setStudents(studentsData);
      const attendanceResponse = await fetch(
        `https://yeasty-claribel-critic-coder-743a0cb5.koyeb.app/classes/attendance?classid=${classId}`
      );
      const attendanceData = await attendanceResponse.json();
  
      console.log("Raw Attendance API Response:", attendanceData);
  
      if (!attendanceData || typeof attendanceData !== "object") {
        console.error("Invalid attendance response structure.");
        return;
      }
  
      setClassname(attendanceData.classname || "Unknown Class");
  
      if (!attendanceData.attendances || !Array.isArray(attendanceData.attendances)) {
        console.error("No valid attendance records found.");
        return;
      }
  
      // 🔥 Step 1: Group attendance by date
      const attendanceByDate = {};
      attendanceData.attendances.forEach((record) => {
        const recordDate = new Date(record.date).toISOString().split('T')[0];
  
        if (!attendanceByDate[recordDate]) {
          attendanceByDate[recordDate] = [];
        }
        attendanceByDate[recordDate].push(record);
      });
  
      console.log("Grouped Attendance by Date:", attendanceByDate);
  
      // 🔥 Step 2: Count subjects properly
      const subjectCounts = {};
  
      Object.keys(attendanceByDate).forEach((date) => {
        const records = attendanceByDate[date];
        const uniqueSubjectsForDate = new Set();
        const tempSubjectCount = {}; // Temporary count per date
  
        records.forEach((record) => {
          if (Array.isArray(record.subjects)) {
            const subjectCountMap = {}; // Track duplicates in a single record
  
            record.subjects.forEach((subject) => {
              subjectCountMap[subject] = (subjectCountMap[subject] || 0) + 1;
            });
  
            // Add unique subjects for this date (avoiding duplication across records)
            Object.keys(subjectCountMap).forEach((subject) => {
              uniqueSubjectsForDate.add(subject);
              tempSubjectCount[subject] = Math.max(tempSubjectCount[subject] || 0, subjectCountMap[subject]);
            });
          }
        });
  
        console.log(`Unique Subjects for ${date}:`, uniqueSubjectsForDate);
        console.log(`Subject Counts for ${date}:`, tempSubjectCount);
  
        // Merge tempSubjectCount into final subjectCounts
        Object.keys(tempSubjectCount).forEach((subject) => {
          subjectCounts[subject] = (subjectCounts[subject] || 0) + tempSubjectCount[subject];
        });
      });
  
      console.log("Final Aggregated Subject Counts:", subjectCounts);
      setSubjects(subjectCounts);
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  
  
  
  useEffect(() => {
    if (!classId) return;
    fetchStudents();
  }, [classId]);

  const aggregatedSubjects = { ...subjects };
  console.log("Aggregated Subjects:", aggregatedSubjects);
  


  useEffect(() => {
    if (!chartRef.current || Object.keys(subjects).length === 0) return;
  
    console.log("Subjects Data (Before Chart Render):", subjects);
  
    const labels = Object.keys(subjects);
    const dataCounts = Object.values(subjects);
  
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
  
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "polarArea",
      data: {
        labels: labels,
        datasets: [
          {
            label: "No. of Classes Conducted",
            data: dataCounts,
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
          legend: { position: "top" },
        },
      },
    });
  }, [subjects]);
  
  
  return (
    <div id="Class" className="w-full pl-4 pr-1.5 pt-9">
      <span className="text-2xl font-bold">{classname + ` `} </span>
      {String(classid) === String(classId) && (
        <div className="flex justify-end w-full">
          <Link to={`/attendance/${classId}`}>
            <button className="bg-[#0059ff] text-white h-10 w-40 rounded-xl">
              Take Attendance
            </button>
          </Link>
          <Link to={`/addstudents/${classId}`}>
            <button className="bg-[#0059ff] text-white h-10 w-40 rounded-xl">
              Update Students
            </button>
          </Link>
        </div>
      )}

      <span className="text-2xl font-bold">Classes Conducted</span>
      {Object.keys(subjects).length > 0 ? (
        <div className="flex justify-center w-full h-max md:h-96">
          <canvas ref={chartRef}></canvas>
        </div>
      ) : (
        <div className="flex justify-center w-full h-max md:h-96">
          No data available
        </div>
      )}

      <span className="text-2xl font-bold">Students </span>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {students.map((student) => (
          <div
            key={student._id}
            className="rounded-sm border border-stroke bg-white py-6 px-6 shadow-default dark:border-strokedark dark:bg-boxdark"
          >
            <Link to={`/student/${student._id}`}>
              <div className="flex">
                <span>{`${student.slno}. `}</span>
                <span> {student.name}</span>
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
