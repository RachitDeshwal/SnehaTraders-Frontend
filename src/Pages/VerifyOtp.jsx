import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../main";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { useUserContext } from "../contexts/UserContext";
import { getCurrentUser } from "../../../backend/controllers/userController";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [loadingverify, setLoadingVerify] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const { userData } = useUserContext();

  const email = userData.email; //
  const handleVerify = async (e) => {
    e.preventDefault();
    setLoadingVerify(true);
    try {
      const res = await axios.post(
        `${serverURL}/api/auth/verify-otp`,
        {
          email,
          otp,
        },
        { withCredentials: true }
      );
      setLoadingVerify(false);

      toast.success("OTP Verified Successfully!");
      getCurrentUser();
      navigate("/");
    } catch (err) {
      toast.error("Invalid OTP!");
      setLoadingVerify(false);
    }
  };
  const handleResend = async (e) => {
    e.preventDefault();
    setLoadingResend(true);

    try {
      const res = await axios.post(
        `${serverURL}/api/auth/resend-otp`,
        {
          email,
        },
        { withCredentials: true }
      );
      toast.success("OTP Resent Successfully!");
      setLoadingResend(false);
    } catch (err) {
      toast.error("Failed to resend OTP!");
      setLoadingResend(false);
    }
  };

  return (
    <div
      className="h-[100vh] w-[100vw] bg-gradient-to-r from-[#3B3A28] via-[#5E503F] to-[#B08D57]
    
    
    
    
    
    
    
    
    
    
    
    
    
     text-[white] flex flex-col items-center justify-center"
    >
      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center ">
        <form
          action=""
          onSubmit={handleVerify}
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px] "
        >
          <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] ">
            <div className="w-[100%] h-[100px] flex flex-col justify-center items-center gap-[10px]">
              <span className="text-[25px] font-semibold">Verify Otp</span>
              <span className="text-[16px]">
                We’ve sent an OTP to your email: <strong>{email}</strong>
              </span>
            </div>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-[100%] h-[80px] border-[2px] border-[#96969635] backdrop:blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold mt-[4%] "
              placeholder="Enter otp"
              required
            />
            <div className="w-[100%] h-[100%] flex items-center justify-start gap-[15px]">
              <button
                className="w-[100%] h-[50px] mt-[20px] rounded-lg flex items-center justify-center cursor-pointer bg-[#c97f6a]"
                type="submit"
              >
                {loadingverify ? <Loading /> : "Verify Otp"}
              </button>
              <button
                className="w-[100%] h-[50px] mt-[20px] rounded-lg flex items-center justify-center cursor-pointer bg-[#c97f6a]"
                onClick={handleResend}
              >
                {loadingResend ? <Loading /> : "Resend Otp"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
