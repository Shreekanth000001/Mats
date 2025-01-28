import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../index.css";
import search from "../assets/search.png";

const Menu = () => {
  const [openmodal, setOpenmodal] = useState(false);

  useEffect(() => {
    // Set openmodal to true for md and larger screens
    if (window.innerWidth >= 768) {
      setOpenmodal(true);
    }
  }, []);

  return (
    <div>
      <div
        id="Toggle button"
        className="md:hidden tracking-wider m-4"
      >
        <div
          className=" w-fit flex flex-col text-gray-900 rounded-2xl"
          onClick={() => setOpenmodal(true)}
        >
          <div className="flex flex-col items-center justify-center bg-[#21243d] rounded-2xl w-[47px] h-[46px] space-y-1 border-t-2  border-white -mt-1 z-10">
            <div className="flex w-full justify-center space-x-2">
              <p className="bg-white rounded-sm w-2 h-2"></p>
              <p className="bg-white rounded-sm w-2 h-2"></p>
            </div>
            <div className="flex justify-center space-x-2 ">
              <p className="bg-white rounded-sm w-2 h-2"></p>
              <p className="bg-white rounded-sm w-2 h-2"></p>
            </div>
          </div>
        </div>
      </div>
      {openmodal && (
        <div id="menu" className="relative">
          <div className="relative container text-gray-500 mx-auto md:mx-0 w-80 md:w-96">

            <div className="rounded-xl md:rounded-none bg-white shadow-xl md:min-h-screen" style={{ boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)" }}>
              <div className="p-6">
                <div className="space-y-4">
                  <h2 className="mb-8 text-2xl text-cyan-900 font-bold">
                    Menu
                  </h2>
                </div>
                <div className="flex items-center justify-center w-full">
                  <div
                    id="search bar"
                    className="flex w-full bg-white border rounded-full"
                  >
                    <input
                      className=" w-full border-none bg-transparent px-4 py-1 text-gray-400 outline-none focus:outline-none "
                      type="search"
                      name="search"
                      placeholder="Search..."
                    />
                    <button
                      type="submit"
                      className="m-2 ml-auto rounded px-4 py-2 text-white"
                    >
                      <img src={search} className="w-8" />
                    </button>
                  </div>
                </div>
                <ul id="ul" className="mt-16 grid space-y-4">
                  <li
                    className="h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 flex items-center space-x-4 justify-center"
                  ><Link to="/" className='w-full flex items-center space-x-4 justify-center'>
                      <span className="w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                        Home
                      </span>
                    </Link>
                  </li>
                  <li
                    className="h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 flex items-center space-x-4 justify-center"
                  ><Link to="/analytics" className='w-full flex items-center space-x-4 justify-center'>
                      <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                        Analytics
                      </span>
                    </Link>
                  </li>
                  <li
                    className="h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                     hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 flex items-center space-x-4 justify-center"
                  ><Link to="/aboutus" className='w-full flex items-center space-x-4 justify-center'>
                      <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                        About Us
                      </span>
                    </Link>
                  </li>
                  <li
                    className="h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                     hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 flex items-center justify-center"
                  ><Link to="/contactus" className='w-full flex items-center space-x-4 justify-center'>
                      <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                        Contact Us
                      </span>
                    </Link>
                  </li>
                  <li
                    className="h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                     hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 w-full flex items-center justify-center"
                  >
                    <Link to="/login" className='w-full flex items-center space-x-4 justify-center'>
                      <span className="font-semibold text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                        Sign In
                      </span>
                    </Link>
                  </li>
                </ul>

                <div className="mt-10 space-y-4 text-gray-600 text-center sm:-mb-8 h-min">
                  <p className="text-xs">
                    By proceeding, you agree to our{" "}
                    <a href="" className="underline">
                      Disclaimer
                    </a>{" "}
                    and confirm you have read our{" "}
                    <a href="" className="underline">
                      Privacy and Cookie Statement
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
