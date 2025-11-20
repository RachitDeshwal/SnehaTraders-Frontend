import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../main";
import { toast, ToastContainer } from "react-toastify";

function OrderDetail() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const daysSinceOrder = Math.floor(
    (new Date() - new Date(state.date)) / (1000 * 60 * 60 * 24)
  );

  const [showReturnForm, setShowReturnForm] = useState(false);
  const [reason, setReason] = useState("");
  const [images, setImages] = useState([]); // Array of base64 image strings or URLs
  const [loading, setLoading] = useState(false);

  const [trackingStatus, setTrackingStatus] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);

  // Handle image uploads (convert to base64)
  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    for (let file of files) {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit return request
  const handleReturnRequest = async () => {
    if (!reason.trim()) {
      toast.error("Please enter a reason for return.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${serverURL}/api/returns/`,
        {
          orderId: state.orderId,
          productId: state._id,
          reason,
          images,
        },
        { withCredentials: true }
      );
      toast.success("Return request submitted successfully!");
      setShowReturnForm(false);
      setReason("");
      setImages([]);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to submit return request"
      );
      console.error(err);
    }
    setLoading(false);
  };

  // Fetch tracking info
  const handleTrackOrder = async () => {
    setTrackingLoading(true);
    try {
      const res = await axios.get(
        `${serverURL}/api/order/track/${state.orderId}`,
        { withCredentials: true }
      );
      setTrackingStatus(res.data);
    } catch (err) {
      alert("Failed to fetch tracking info");
      console.error(err);
    }
    setTrackingLoading(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-r from-[#3B3A28] via-[#5E503F] to-[#B08D57] p-[30px] text-white mt-[70px]">
        <div className="bg-[#3f3735] p-6 rounded-2xl max-w-2xl mx-auto">
          <img
            src={state.image1}
            alt={state.name}
            className="w-[250px] h-[250px] mx-auto rounded-md object-cover"
          />
          <h1 className="text-[26px] mt-5 font-semibold">{state.name}</h1>
          <p className="text-[18px] text-[#aaf4e7] mt-2">
            ₹{state.price} | Quantity: {state.quantity} | Size: {state.size}
          </p>
          <p className="mt-3 text-[#e4fbff]">
            <b>Status:</b> {state.status}
          </p>
          <p className="text-[#e4fbff]">
            <b>Date:</b> {new Date(state.date).toDateString()}
          </p>
          <p className="text-[#e4fbff]">
            <b>Payment Method:</b> {state.paymentMethod}
          </p>

          <div className="flex justify-between items-center mt-6">
            {/* <button
              onClick={handleTrackOrder}
              className="bg-[#101919] px-[20px] py-[8px] rounded-md text-[16px] active:bg-slate-500"
            >
              {trackingLoading ? "Loading..." : "Track Order"}
            </button> */}

            {daysSinceOrder <= 7 && (
              <button
                onClick={() => setShowReturnForm(!showReturnForm)}
                className=" px-[20px] py-[8px] rounded-md text-[16px] bg-[#7a3521] cursor-pointer hover:opacity-90"
              >
                {showReturnForm ? "Cancel" : "Return Request"}
              </button>
            )}
          </div>

          {/* Show tracking info */}
          {/* {trackingStatus && (
            <div className="mt-4 bg-[#364c3a] p-4 rounded-md text-white max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-2">
                Order Tracking Status
              </h3>
              <p>
                <b>Status:</b> {trackingStatus.status}
              </p>
              <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${(trackingStatus.progress || 0) * 100}%` }}
                />
              </div>
            </div>
          )} */}

          {/* Return Form */}
          {showReturnForm && (
            <div className="mt-6 bg-[#3A4B3A] p-4 rounded-md">
              <label className="block mb-2 font-semibold">
                Reason for return <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                className="w-full rounded-md p-2 text-white"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for return"
                required
              />

              <button
                disabled={loading}
                onClick={handleReturnRequest}
                className="mt-4 bg-[#4d2828] px-6 py-2 rounded-md text-white disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Return Request"}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderDetail;
