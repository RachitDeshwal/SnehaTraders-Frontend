import React from "react";
import Title from "../components/Title";
import contact from "../assets/contact.jpg";

const Contact = () => {
  return (
    <div className="w-[99vw] min-h-[100vh] flex flex-col justify-center items-center gap-[50px] mt-[70px] bg-gradient-to-r from-[#3B3A28] via-[#5E503F] to-[#B08D57] ">
      <Title text1={"CONTACT"} text2={"US"} />
      <div className="w-[100%] flex flex-col items-center justify-center lg:flex-row">
        <div className="lg:w-[50%] w-[100%] flex items-center justify-center">
          <img
            src={contact}
            alt=""
            className="lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm"
          />
        </div>
        <div className="lg:w-[50%] w-[80%] flex flex-col gap-[20px] items-start justify-center mt-[20px] lg:mt-[0px]">
          <p className="lg:w-[80%] w-[100%] text-white font-bold lg:text-[18px] text-[15px]">
            Our Store
          </p>
          <p className="lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px] ">
            <p>12345 Random Station</p>
            <p>Random city, state ,country</p>
          </p>
          <p className="lg:w-[80%] w-[100%] text-white md:text-[16px] text-[13px] ">
            <p>tel: +91 6454626226</p>
            <p>Email: admin123@gmail.com</p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
