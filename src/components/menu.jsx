import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import "../index.css";
import search from "../assets/search.png";
import Logom from "../assets/logom.webp";

const Menu = () => {
  const navigate = useNavigate();
  const userid = sessionStorage.getItem('userid');
  const userstatus = sessionStorage.getItem('classmod');
  const [openmodal, setOpenmodal] = useState(false);
  const menuRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    navigate(`/students/${encodeURIComponent(searchQuery)}`);
  };

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setOpenmodal(true);
    }
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenmodal(false);
      }
    };

    if (window.innerWidth < 768) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openmodal]);

  const logout = () => {
    sessionStorage.clear();
    navigate('/');
  }


  return (
    <div className="">
      <div id="Toggle button"
        className="md:hidden tracking-wider p-4 bg-white w-full fixed top-0 z-50 shadow">
        <div className="flex text-gray-900 rounded-2xl">
          <div className="flex flex-col items-center justify-center bg-[#21243d] rounded-2xl w-[47px] h-[46px] space-y-1 border-t-2  border-white -mt-1 z-10" onClick={() => setOpenmodal(true)} >
            <div className="flex w-full justify-center space-x-2">
              <p className="bg-white rounded-sm w-2 h-2"></p>
              <p className="bg-white rounded-sm w-2 h-2"></p>
            </div>
            <div className="flex justify-center space-x-2 ">
              <p className="bg-white rounded-sm w-2 h-2"></p>
              <p className="bg-white rounded-sm w-2 h-2"></p>
            </div>
          </div>
          <div className="flex ml-4 justify-center items-center w-[70%]">
            <img className="w-9 h-9 mr-2 rounded-full" src={Logom} alt="logo" />
            <span className="font-extrabold">MATS</span>
          </div>
        </div>
      </div>
      <div className="md:hidden h-[80px]"></div>
      {openmodal && (
        <div id="menu"
          className="fixed inset-0 z-50 md:relative md:z-0" >
          <div className="relative container mx-auto md:mx-0 w-80 md:w-96">
            <div ref={menuRef} className="overflow-hidden fixed top-0 left-0 h-screen w-80 md:w-96 bg-[#1C2434] text-white shadow-xl" style={{ boxShadow: "0 -2px 4px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)", }}>
              <a href="/" className="hidden md:flex items-center mb-6 text-2xl font-semibold text-white pt-6 pl-6" >
                <img className="w-9 h-9 mr-2 rounded-full" src={Logom} alt="logo" />
                MATS
              </a>
              <div className="p-6">
                <div className="space-y-4">
                  <h2 className="mb-8 text-2xl font-bold">Menu</h2>
                </div>
                <form onSubmit={handleSearch} className="flex items-center justify-center w-full">
                  <div className="flex w-full bg-white text-black border rounded-full">
                    <input
                      className="w-full border-none bg-transparent px-4 py-1 outline-none focus:outline-none"
                      type="search"
                      name="search"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit" className="m-2 ml-auto rounded px-4 py-2">
                      <img src={search} className="w-8" alt="Search" />
                    </button>
                  </div>
                </form>

                <ul id="ul" className="mt-16 grid space-y-4">
                  <li className="h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 flex items-center space-x-4 justify-center">
                    <Link to="/"
                      className="w-full flex items-center space-x-4 justify-center" >
                      <span className="w-max font-semibold tracking-wide text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                        Home
                      </span>
                    </Link>
                  </li>
                  {userstatus == "admin" && (<li
                    className="h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 flex items-center space-x-4 justify-center">
                    <Link to="/admin"
                      className="w-full flex items-center space-x-4 justify-center" >
                      <span className="block w-max font-semibold tracking-wide text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                        Admin Dashboard
                      </span>
                    </Link>
                  </li>)}

                  <li className="h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 flex items-center space-x-4 justify-center" >
                    <Link to="/aboutus"
                      className="w-full flex items-center space-x-4 justify-center" >
                      <span className="block w-max font-semibold tracking-wide text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                        About Us
                      </span>
                    </Link>
                  </li>
                  <li className="h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300  hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 flex items-center justify-center"  >
                    <Link to="/contactus"
                      className="w-full flex items-center space-x-4 justify-center" >
                      <span className="block w-max font-semibold tracking-wide text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                        Contact Us
                      </span>
                    </Link>
                  </li>
                  <li className="h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300  hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 w-full flex items-center justify-center">
                    {userid ? (<div onClick={logout}
                      className="w-full flex items-center space-x-4 justify-center" >
                      <span className="font-semibold text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                        Sign Out
                      </span>
                    </div>) : (
                      <a href="https://mats-edu.vercel.app/login"
                        className="w-full flex items-center space-x-4 justify-center" >
                        <span className="font-semibold text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                          Sign In
                        </span>
                      </a>)}
                  </li>
                </ul>

                <div className="mt-10 space-y-4 text-center sm:-mb-8 h-min">
                  <p className="text-xs">
                    By proceeding, you agree to our{" "}
                    <Link href="/aboutus" className="underline">
                      Disclaimer
                    </Link>{" "}
                    and confirm you have read our{" "}
                    <Link to="/aboutus" className="underline">
                      Privacy and Cookie Statement
                    </Link>
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
