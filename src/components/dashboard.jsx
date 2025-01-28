import React from "react";
import "../index.css";
import Profilepic from "../assets/profile.png";

const Dashboard = () => {
  return (
    <div id="Dashboard" className="w-full pl-4 pr-1.5">
      <div className="hidden md:flex justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center">
          <span className="mr-4">Name</span>
          <img className="w-9 h-9 rounded-full" src={Profilepic} alt="ntg" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div>BCA I</div>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <div className="font-bold">35</div>
              <span className="text-[#65758C]">Total attendance</span>
            </div>
            <div>98%</div>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div>BCA II</div>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <div className="font-bold">39</div>
              <span className="text-[#65758C]">Total attendance</span>
            </div>
            <div>99%</div>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div>BCA III</div>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <div className="font-bold">32</div>
              <span className="text-[#65758C]">Total attendance</span>
            </div>
            <div>96%</div>
          </div>
        </div>
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div>BCOM I</div>
          <div className="mt-4 flex items-end justify-between">
            <div className="flex flex-col">
              <div className="font-bold">35</div>
              <span className="text-[#65758C]">Total attendance</span>
            </div>
            <div>98%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
