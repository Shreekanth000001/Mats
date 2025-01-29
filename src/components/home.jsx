import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import "../index.css";
import Menu from "./menu";
import Dashboard from "./dashboard";

const Home = () => {
  const location = useLocation();
  const [classes, setClasses] = useState([]);

  const fetchClasses = () => {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error("Error fetching classes:", error));
  }

  useEffect(() => {
    fetchClasses();
  }, [location.pathname]);

  const renderContent = () => {
    if (location.pathname === "/") {
      return <Dashboard data={classes} />;
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
