import Title from "../components/Title";
import about from "../assets/about.jpg";

const About = () => {
  return (
    <div className="w-[99vw] min-h-[100vh] flex flex-col justify-center items-center gap-[50px] mt-[70px] bg-gradient-to-r from-[#3B3A28] via-[#5E503F] to-[#B08D57] ">
      <Title text1={"ABOUT"} text2={"US"} />
      <div className="w-[100%] flex flex-col justify-center items-center lg:flex-row">
        <div className="lg:w-[50%] w-[100%] flex justify-center items-center">
          <img
            src={about}
            alt=""
            className="lg:w-[65%] w-[80%]  shadow-md rounded-sm shadow-black"
          />
        </div>
        <div className="lg:w-[50%] w-[80%] flex flex-col justify-center items-start gap-[20px] mt-[20px] lg:mt-[0px]">
          <p className="text-gray-300 lg:w-[80%] w-[100%] md:text-[16px] text-[13px]">
            Sneha Traders is your trusted destination for high-quality school
            uniforms, crafted with care to ensure comfort, durability, and a
            perfect fit for every student. We believe that confidence starts
            with the right uniform — one that reflects discipline, pride, and
            school spirit.
          </p>
          <p className="text-gray-300 lg:w-[80%] w-[100%] md:text-[16px] text-[13px]">
            With years of experience and a commitment to excellence, we bring
            together superior fabrics, precise stitching, and elegant designs.
            From daily wear to complete school uniform sets, Sneha Traders
            ensures quality, affordability, and timely delivery that schools and
            parents can rely on.
          </p>
          <p className="text-gray-300 lg:w-[80%] w-[100%] md:text-[18px] text-[15px] font-bold mt-[10px]">
            Our Mission!
          </p>
          <p className="text-gray-300 lg:w-[80%] w-[100%] md:text-[16px] text-[13px]">
            Our mission is to provide comfortable, affordable, and durable
            school uniforms that help students look smart and feel confident
            every day. Sneha Traders is dedicated to supporting educational
            institutions with reliable service, consistent quality, and a
            customer-first approach that makes uniform shopping simple and
            stress-free.
          </p>
        </div>
      </div>
      <div className="w-[100%] flex flex-col justify-center items-center gap-[10px] ">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
        <div className="w-[80%] flex justify-center items-center flex-col lg:flex-row  py-[40px]">
          <div className="lg:w-[33%] w-[90%] border-[1px] border-gray-100 h-[250px] flex flex-col justify-center items-center gap-[20px] px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b] ">
            <b className="text-[20px] font-semibold text-[#bff1f9]">
              Quality Assurance
            </b>
            <p className="">
              We guarantee quality through strict checks, reliable sourcing
              commitment to customer satisfaction always
            </p>
          </div>
          <div className="lg:w-[33%] w-[90%] border-[1px] border-gray-100 h-[250px] flex flex-col justify-center items-center gap-[20px] px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b] ">
            <b className="text-[20px] font-semibold text-[#bff1f9]">
              Convenience
            </b>
            <p className="">
              Shop easily with fast delivery, simple navigation, secure checkout
              and everything you need in one place.
            </p>
          </div>
          <div className="lg:w-[33%] w-[90%] border-[1px] border-gray-100 h-[250px] flex flex-col justify-center items-center gap-[20px] px-[40px] py-[10px] text-white backdrop-blur-[2px] bg-[#ffffff0b] ">
            <b className="text-[20px] font-semibold text-[#bff1f9]">
              Exceptional Customer Service
            </b>
            <p className="">
              Our dedicated support team ensures quick responses, helpful
              solutions and a smooth shopping experience every time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
