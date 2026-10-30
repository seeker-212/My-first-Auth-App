import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendurl, setUserData, setIsLoggedin } =
    useContext(AppContent);

  //Send Verification Email
  const sendVerifiationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendurl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        navigate("/verify-email");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //Logout Handleer
  const logoutHandler = async () => {
    try {
      const { data } = await axios.post(backendurl + "/api/auth/logout");
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate("/");
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full flex justify-between top-0 items-center p-4 sm:p-6 sma:px-4 absolute">
      <img src={assets.logo} alt="logo" className="w-24 sm:w-32" />
      {userData ? (
        <div
          className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white
        cursor-pointer relative group mr-0 sm:mr-9"
        >
          {userData.name[0].toUpperCase()}
          <div
            className="absolute hidden group-hover:block top-0 right-0 z-10 text-black
          rounded pt-10"
          >
            <ul className="list-none m-0 p-2 bg-gray-100 text-sm">
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerifiationOtp}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                >
                  Verify Email
                </li>
              )}
              <li
                onClick={logoutHandler}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full
      px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all cursor-pointer"
        >
          Login <img src={assets.arrow_icon} />
        </button>
      )}
    </div>
  );
};

export default Navbar;
