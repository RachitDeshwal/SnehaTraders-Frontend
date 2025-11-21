import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  let navigate = useNavigate();
  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-r from-[#3B3A28] via-[#5E503F] to-[#B08D57] md:text-[70px] text-[30px] flex items-center justify-center text-white flex-col gap-[20px]">
      404 Page not Found
      <button
        className="bg-white px-[20px] py-[10px] rounded-xl text-[18px] text-black cursor-pointer"
        onClick={() => navigate("/login")}
      >
        Log in
      </button>
    </div>
  );
}

export default NotFound;
