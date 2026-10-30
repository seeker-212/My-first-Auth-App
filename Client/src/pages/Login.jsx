import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { data, useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendurl, setIsLoggedin, getuserData } =
    useContext(AppContent);

  //Usestate
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //This handles form submission
  const onsubmitHandleer = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(backendurl + "/api/auth/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getuserData();
          navigate("/");
          toast.success(`Welcome ${data.name}`);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendurl + "/api/auth/login", {
          email,
          password,
        });
        //TODO: WILL still implement the username to show on the toast notification.
        if (data.success) {
          setIsLoggedin(true);
          getuserData();
          navigate("/");
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br
    from-blue-200 to-purple-400 "
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32
      cursor-pointer"
      />
      <div
        className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300
      text-sm"
      >
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up" ? "Create your account" : "Login to you account"}
        </p>
        <form onSubmit={onsubmitHandleer}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                className="outline-none bg-transparent"
                type="text"
                placeholder="Full Name"
                required
                value={name}
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none bg-transparent"
              type="email"
              placeholder="Email"
              required
              value={email}
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none bg-transparent"
              type="password"
              placeholder="Password"
              required
              value={password}
            />
          </div>
          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forgot Password?
          </p>

          <button
            className="w-full py-2.5 rounded-full bg-linear-to-r from-indigo-500
          to-indigo-900 text-white font-medium cursor-pointer"
          >
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Login Here
            </span>
          </p>
        ) : (
          <p
            onClick={() => setState("Sign Up")}
            className="text-gray-400 text-center text-xs mt-4"
          >
            Don't have an account?{" "}
            <span className="text-blue-400 cursor-pointer underline">
              Register Here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
