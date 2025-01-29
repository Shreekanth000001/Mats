import React, { useState } from "react";
import "../index.css";
import Profilepic from "../assets/profile.png";

const Dashboard = ({ classdata, attendancedata }) => {

  const getattendance = (classid) => {
    const attended = attendancedata
      .filter(attendance => attendance.classId === classid)
      .reduce((total, attendance) => total + attendance.students.length, 0);
    return attended;
  }
  return (
    <div id="Dashboard" className="w-full pl-4 pr-1.5">
      <div className="hidden md:flex justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center">
          <span className="mr-4">Name</span>
          <img className="w-9 h-9 rounded-full" src={Profilepic} alt="ntg" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {classdata.map((classData) => (
          <div key={classData._id} className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">

            <div >
              <div>{classData.name}</div>
              <div className="mt-4 flex items-end justify-between">
                <div className="flex flex-col">
                  <div className="font-bold">{classData.strength}</div>
                  <span className="text-[#65758C]">Total attendance</span>
                </div>
                <div>{((getattendance(classData._id) / classData.strength) * 100).toFixed(1)}%</div>
              </div>
            </div>
          </div>
        ))}

      </div></div>
  );
};

export default Dashboard;
