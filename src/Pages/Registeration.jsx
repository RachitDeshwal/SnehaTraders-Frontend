import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import google from "../assets/google.png";
import { serverURL } from "../main";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { provider, auth } from "../utils/Firebase";
import { useUserContext } from "../contexts/UserContext";

function Registeration() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getCurrentUser } = useUserContext();
  const signupwithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      const user = response.user;
      const name = user.displayName;
      const email = user.email;
      const result = await axios.post(
        `${serverURL}/api/auth/googlelogin`,
        { name, email },
        { withCredentials: true }
      );
      getCurrentUser();
      toast.success("Registered successfully");

      navigate("/");
    } catch (e) {
      toast.error("failed in registeration");
      console.log(e);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverURL}/api/auth/register`,
        { name, email, password },
        { withCredentials: true }
      );

      setLoading(false);

      toast.success("otp sent Successful!");

      // ✅ Move to OTP verification page with email
      navigate("/verify-otp", { state: { email: email } });
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div
      className="h-[100vh] w-[100vw] bg-gradient-to-r from-[#3B3A28] via-[#5E503F] to-[#B08D57]













 text-[white] flex flex-col items-center justify-start"
    >
      <div className="w-[100%] h-[100px] flex flex-col justify-center items-center gap-[10px]">
        <span className="text-[25px] font-semibold">Registeration Page</span>
        <span className="text-[16px]">
          Welcome to SnehaTraders , Place your Order
        </span>
      </div>
      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center ">
        <form
          action=""
          onSubmit={handleSignup}
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px] "
        >
          <div
            className="w-[90%] h-[50px] bg-[#cc8a79] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer"
            onClick={signupwithGoogle}
          >
            <img className="w-[50px] rounded-lg" src={google} alt="" />
            Registeration with Google
          </div>
          <div className="w-[100%] h-[20px] flex items-center justify-center gap-[10px] ">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>
          <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] ">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold "
              placeholder="username"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[100%] h-[50px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold "
              placeholder="Email"
              required
            />
            <input
              type={!show ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[100%] h-[50px] border-[2px] relative border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold "
              placeholder="Password"
              required
            />
            {!show && (
              <IoEyeOutline
                className="w-[20px] h-[20px] cursor-pointer absolute right-[12%]"
                onClick={() => {
                  setShow((prev) => !prev);
                }}
              />
            )}
            {show && (
              <IoEye
                className="w-[20px] h-[20px] cursor-pointer absolute right-[12%]"
                onClick={() => {
                  setShow((prev) => !prev);
                }}
              />
            )}
            <button className="w-[100%] h-[50px] mt-[20px] rounded-lg flex items-center justify-center cursor-pointer bg-[#c97f6a]">
              {loading ? <Loading /> : "Create Account"}
            </button>
            <p className="flex gap-[10px] ">
              You have any Account?{" "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => {
                  navigate("/login");
                }}
              >
                login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registeration;
