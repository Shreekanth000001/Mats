import React, { useEffect, useState } from "react";
import "../index.css";
import search from "../assets/search.png";

const Menu = () => {
  const [openmodal, setOpenmodal] = useState(false);
  return (
    <div>
      <div
        id="Toggle button"
        className="md:flex md:mx-auto justify-center tracking-wider mb-7"
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
        <div id="menu" className="relative py-16">
          <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
            <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
              <div className="rounded-xl bg-white shadow-xl">
                <div className="p-6 sm:p-16">
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
                  <div id="grid" className="mt-16 grid space-y-4">
                    <button
                      className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                    >
                      <div className="relative flex items-center space-x-4 justify-center">
                        <a href="">
                          <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                            Home
                          </span>
                        </a>
                      </div>
                    </button>
                    <button
                      className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                    >
                      <div className="relative flex items-center space-x-4 justify-center">
                        <a href="">
                          <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                            Analytics
                          </span>
                        </a>
                      </div>
                    </button>
                    <button
                      className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                     hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                    >
                      <div className="relative flex items-center space-x-4 justify-center">
                        <a href="">
                          <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                            About Us
                          </span>
                        </a>
                      </div>
                    </button>
                    <button
                      className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                     hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                    >
                      <div className="relative flex items-center space-x-4 justify-center">
                        <a href="">
                          <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                            Contact Us
                          </span>
                        </a>
                      </div>
                    </button>
                    <button
                      className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 
                                     hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                    >
                      <div className="relative flex items-center space-x-4 justify-center">
                        <a href="">
                          <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                            Sign In
                          </span>
                        </a>
                      </div>
                    </button>
                  </div>

                  <div className="mt-32 space-y-4 text-gray-600 text-center sm:-mb-8">
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
        </div>
      )}
    </div>
  );
};

export default Menu;
