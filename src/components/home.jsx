import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../index.css";
import Menu from "./menu";
import Dashboard from "./dashboard";
import Class from "./class";
import Student from "./student";

const Home = () => {
  const location = useLocation();
  const [classes, setClasses] = useState([]);
  const [attendances, setAttendances] = useState([]);

  const fetchClasses = () => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error("Error fetching classes:", error));
  }
  const fetchAttendances = () => {
    fetch("http://localhost:3000/attendance/getall")
      .then((response) => response.json())
      .then((data) => setAttendances(data))
      .catch((error) => console.error("Error fetching classes:", error));
  }

  useEffect(() => {
    fetchClasses();
    fetchAttendances();
  }, [location.pathname]);

  const renderContent = () => {
    if (location.pathname === "/") {
      return <Dashboard classdata={classes} attendancedata={attendances}/>;
    }
    else if (location.pathname.startsWith('/class/')) {
      const classid = location.pathname.split('/')[2];
      return <Class classId={classid} />;
   }
    else if (location.pathname.startsWith('/student/')) {
      const studentid = location.pathname.split('/')[2];
      return <Student studentId={studentid} />;
   }
    else if (location.pathname.startsWith('/attendance/')) {
      const classid = location.pathname.split('/')[2];
      return <Student classId={classid} />;
   }
    return null;
  };

  return (
    <div className="App bg-[#F1F5F9] tracking-wide h-screen">
      <div className="md:flex tracking-wider mb-7 md:mb-0">
        <Menu />
        {renderContent()}
      </div>
    </div>
  );
};

export default Home;
