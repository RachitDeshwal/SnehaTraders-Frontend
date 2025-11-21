import React, { useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

import { useShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { serverURL } from "../main";

function PlaceOrder() {
  const navigate = useNavigate();
  const { cartItem, setCartItem, delivery_fee, getCartAmount, products } =
    useShopContext();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
    pincode: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // ✅ Dynamically load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ✅ Initialize payment window
  const initPay = async (order, orderData) => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Failed to load Razorpay SDK. Please check your connection.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Online Payment for your order",
      order_id: order.id,
      handler: async (response) => {
        try {
          // combine payment + order data for backend verification
          const verifyData = { ...response, ...orderData };
          const { data } = await axios.post(
            `${serverURL}/api/order/verify`,
            verifyData,
            { withCredentials: true }
          );

          if (data) {
            toast.success("Payment successful! Order placed.");
            setCartItem({});
            navigate("/order");
          }
        } catch (err) {
          toast.error("Payment verification failed!");
          console.log(err);
        }
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // ✅ Submit form (starts payment)
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      // Step 1: Create Razorpay order on backend
      const { data: order } = await axios.post(
        `${serverURL}/api/order/create-razorpay`,
        { amount: orderData.amount },
        { withCredentials: true }
      );

      // Step 2: Open Razorpay window
      if (order && order.id) {
        initPay(order, orderData);
      } else {
        toast.error("Unable to start payment. Try again later.");
      }
    } catch (err) {
      toast.error("Failed to place order");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] w-full bg-gradient-to-r from-[#3B3A28] via-[#5E503F] to-[#B08D57] flex flex-col md:flex-row items-start justify-evenly gap-[50px] py-[50px] mt-4">
      <div className="lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px]">
        <form
          onSubmit={onSubmitHandler}
          className="lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]"
        >
          <div className="py-[10px]">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          </div>

          {/* --- Form Fields --- */}
          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px] ">
            <input
              type="text"
              placeholder="First Name"
              className="w-[48%] h-[50px] rounded-md bg-[#493f3c] placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434] text-white"
              required
              onChange={changeHandler}
              value={formData.firstName}
              name="firstName"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-[48%] h-[50px] text-white rounded-md bg-[#493f3c] placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]"
              required
              onChange={changeHandler}
              value={formData.lastName}
              name="lastName"
            />
          </div>

          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px] ">
            <input
              type="email"
              placeholder="Email"
              className="w-[100%] text-white h-[50px] rounded-md bg-[#493f3c] placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]"
              required
              onChange={changeHandler}
              value={formData.email}
              name="email"
            />
          </div>

          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px] ">
            <input
              type="text"
              placeholder="Street"
              className="w-[100%] text-white h-[50px] rounded-md bg-[#493f3c] placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]"
              required
              onChange={changeHandler}
              value={formData.street}
              name="street"
            />
          </div>

          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px] ">
            <input
              type="text"
              placeholder="City"
              className="w-[48%] text-white h-[50px] rounded-md bg-[#493f3c] placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]"
              required
              onChange={changeHandler}
              value={formData.city}
              name="city"
            />
            <input
              type="text"
              placeholder="State"
              className="w-[48%] text-white h-[50px] rounded-md bg-[#493f3c] placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]"
              required
              onChange={changeHandler}
              value={formData.state}
              name="state"
            />
          </div>

          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px] ">
            <input
              type="tel"
              placeholder="Pincode"
              className="w-[48%] text-white h-[50px] rounded-md bg-[#493f3c] placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]"
              required
              onChange={changeHandler}
              value={formData.pincode}
              name="pincode"
            />
            <input
              type="text"
              placeholder="Country"
              className="w-[48%] h-[50px] text-white rounded-md bg-[#493f3c] placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]"
              required
              onChange={changeHandler}
              value={formData.country}
              name="country"
            />
          </div>

          <div className="w-[100%] h-[70px] flex items-center justify-between px-[10px] ">
            <input
              type="tel"
              placeholder="Phone"
              min={10}
              className="w-[100%] text-white h-[50px] rounded-md bg-[#493f3c] placeholder:text-white text-[18px] px-[20px] shadow-sm shadow-[#343434]"
              required
              onChange={changeHandler}
              value={formData.phone}
              name="phone"
            />
          </div>

          <div className="w-full flex items-center justify-center mt-[20px]">
            <button
              type="submit"
              className="text-[18px] active:bg-slate-500 cursor-pointer bg-[#493f3c] py-[10px] px-[50px] rounded-2xl text-white flex items-center justify-center gap-[20px] border-[1px] border-[#80808049]"
            >
              {loading ? <Loading /> : "PAY NOW"}
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:w-[45%] w-full flex flex-col items-center lg:items-start justify-start gap-[20px] max-w-[450px]">
        <CartTotal className="py-[20px]  sm:mb-[100px]" />
      </div>
    </div>
  );
}

export default PlaceOrder;
