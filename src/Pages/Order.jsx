import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import axios from "axios";
import { serverURL } from "../main";
import { useNavigate } from "react-router-dom";

function Order() {
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

  const loadOrderData = async () => {
    try {
      let result = await axios.post(
        `${serverURL}/api/order/userorder`,
        {},
        { withCredentials: true }
      );

      if (result.data) {
        let allOrdersItem = [];
        result.data.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["date"] = order.date;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["orderId"] = order._id;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  // Navigate to order details page
  const handleOrderClick = (item) => {
    navigate(`/order/${item.orderId}`, { state: item });
  };

  return (
    <div className="w-[100vw] min-h-[100vh] pb-[150px] p-[20px] overflow-hidden bg-gradient-to-r from-[#3B3A28] via-[#5E503F] to-[#B08D57]">
      <div className="h-[8%] w-[100%] text-center mt-[80px]">
        <Title text1={"MY"} text2={"ORDER"} />
      </div>
      <div className="w-[100%] h-[92%] flex flex-wrap gap-[20px]">
        {orderData.map((item, index) => (
          <div
            key={index}
            onClick={() => handleOrderClick(item)}
            className="w-[100%] h-[10%] cursor-pointer hover:bg-[#484544] transition-all duration-200"
          >
            <div className="w-[100%] h-[80%] flex items-start gap-6 bg-[#3f3735] px-[20px] py-[10px] rounded-2xl relative">
              <img
                src={item.image1}
                alt={item.name}
                className="w-[130px] h-[130px] rounded-md object-cover"
              />
              <div className="flex justify-center items-start gap-[5px] flex-col">
                <p className="md:text-[25px] text-[20px] text-[#f3f9fc]">
                  {item.name}
                </p>
                <div className="flex flex-wrap md:flex-nowrap items-center gap-[8px] md:gap-[20px]">
                  <p className="md:text-[18px] text-[12px] text-[#aaf4e7]">
                    &#8377;{item.price}
                  </p>
                  <p className="md:text-[18px] text-[12px] text-[#aaf4e7]">
                    Quantity: {item.quantity}
                  </p>
                  <p className="md:text-[18px] text-[12px] text-[#aaf4e7]">
                    Size: {item.size}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="md:text-[18px] text-[12px] text-[#aaf4e7]">
                    Date:
                    <span className="text-[#e4fbff] pl-[10px] md:text-[16px] text-[11px]">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="md:text-[16px] text-[12px] text-[#aaf4e7]">
                    Payment Method: {item.paymentMethod}
                  </p>
                </div>
                <div className="absolute md:left-[55%] md:top-[40%] right-[2%] top-[2%]">
                  <div className="flex items-center gap-[5px]">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="md:text-[17px] text-[10px] text-[#f3f9fc]">
                      {item.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
