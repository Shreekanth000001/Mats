import React, { useState } from "react";
import Alert from "./alert";
import { useNavigate } from "react-router-dom";
import Logom from "../assets/logom.webp";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [randomNo, setRandomNo] = useState(0);

  const handleSubmission = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      fetchuser(data.authToken);
    } else {
      const data = await response.json();
      setMessage(data.message);
    }
  };

  const fetchuser = async (authToken) => {
    const response = await fetch("http://localhost:3000/getuser", {
      method: "POST",
      headers: {
        authToken: authToken,
      },
    });
    const data = await response.json();
    sessionStorage.setItem("authToken", authToken);
    sessionStorage.setItem("userid", data.user._id);
    sessionStorage.setItem("username", data.user.name);
    sessionStorage.setItem("useremail", data.user.email);
    sessionStorage.setItem("classmod", data.user.classmod);
  
  if(!sessionStorage.getItem('classmod') == 'admin')
    sessionStorage.setItem("classid", data.classid._id);
    navigate("/");
  };

  const forgot = () => {
    const newRandomNo = Math.floor(Math.random() * 11);
    setRandomNo(newRandomNo);
    setMessage("Login with a different account if you forgot your password");
  };

  return (
    <div>
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-2 mx-auto md:h-screen lg:py-0 mt-4">
          {message && (
            <Alert message={message} bgcolor={"white"} newRandomNo={randomNo} />
          )}
          <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src={Logom} alt="logo" />
            MATS</a>
          <div className="w-full bg-white rounded-3xl shadow md:mt-0 sm:w-[480px] xl:p-0">
            <div className="p-8 space-y-3 md:space-y-3 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-wide text-gray-900 md:text-2xl">
                Login</h1>
              <form className="space-y-4 md:space-y-4" onSubmit={handleSubmission} >
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900" >
                    Your email </label>
                  <input type="email" name="email" id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="abc@example.com" required="" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900" >
                    Password
                  </label>
                  <input type="password" name="password" id="password" placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    required="" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        required="" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline"
                    onClick={() => forgot()} >
                    Forgot password?
                  </a>
                </div>
                <button type="submit"
                  className="w-full text-white bg-[#eb5b77] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500">
                  Don’t have an account yet?{" "}
                  <a href="/signup"
                    className="font-medium text-primary-600 underline" >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
