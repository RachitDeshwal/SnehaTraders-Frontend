import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverURL } from "../main";
import Title from "../components/Title";

function ReturnRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cancelingId, setCancelingId] = useState(null);

  const fetchReturnRequests = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.post(
        `${serverURL}/api/returns/requests`,
        {},
        { withCredentials: true }
      );
      setRequests(res.data);
    } catch (err) {
      console.error("Error fetching return requests:", err);
      setError("Failed to load return requests. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const cancelReturnRequest = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this return request?"))
      return;
    try {
      setCancelingId(id);
      await axios.delete(`${serverURL}/api/returns/cancel/${id}`, {
        withCredentials: true,
      });
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (err) {
      console.error("Error canceling return request:", err);
      alert("Failed to cancel the return request. Please try again.");
    } finally {
      setCancelingId(null);
    }
  };

  useEffect(() => {
    fetchReturnRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#3B3A28] via-[#5E503F] to-[#B08D57] p-6 text-white">
      <div className="max-w-5xl mx-auto mt-[90px]">
        <Title text1="RETURN" text2="REQUESTS" />

        {loading ? (
          <p className="text-center mt-10">Loading...</p>
        ) : error ? (
          <p className="text-center mt-10 text-red-400">{error}</p>
        ) : requests.length === 0 ? (
          <p className="text-center mt-10">No return requests found.</p>
        ) : (
          <div className="mt-8 flex flex-col gap-6">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-[#3f3735] rounded-xl p-6  flex flex-col md:flex-row gap-6 justify-between items-start"
              >
                {/* Product Image */}
                <img
                  src={req.product?.image1 || ""}
                  alt={req.product?.name || "Product"}
                  className="w-40 h-40 rounded-md object-cover flex-shrink-0"
                />

                <div className="flex-1">
                  <h3 className="text-2xl font-semibold">
                    {req.product?.name}
                  </h3>

                  <p className="mt-2">
                    <b>Reason:</b> {req.reason}
                  </p>

                  {/* Show images if any */}
                  {req.images && req.images.length > 0 && (
                    <div className="flex gap-3 mt-3 overflow-x-auto">
                      {req.images.map((imgUrl, i) => (
                        <img
                          key={i}
                          src={imgUrl}
                          alt={`return-img-${i}`}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  )}

                  <p className="mt-3">
                    <b>Status:</b>{" "}
                    <span
                      className={`font-semibold ${
                        req.status === "Approved"
                          ? "text-green-400"
                          : req.status === "Rejected"
                          ? "text-red-500"
                          : req.status === "Refunded"
                          ? "text-yellow-400"
                          : "text-blue-300"
                      }`}
                    >
                      {req.status}
                    </span>
                  </p>

                  {/* Admin Note if exists */}
                  {req.adminNote && (
                    <p className="mt-2 italic text-[#ccc]">
                      <b>Admin Note:</b> {req.adminNote}
                    </p>
                  )}

                  <p className="mt-2 text-[#e4fbff] text-sm">
                    Requested on: {new Date(req.createdAt).toLocaleString()}
                  </p>

                  {/* ✅ Cancel Button - visible only if status is Pending */}
                  {req.status === "Pending" && (
                    <button
                      onClick={() => cancelReturnRequest(req._id)}
                      disabled={cancelingId === req._id}
                      className="mt-4 bg-[#673e35] hover:bg-[#986356] cursor-pointer text-white px-4 py-2 rounded-lg transition disabled:opacity-50"
                    >
                      {cancelingId === req._id
                        ? "Cancelling..."
                        : "Cancel Request"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReturnRequests;
