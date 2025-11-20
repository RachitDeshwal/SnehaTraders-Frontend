import { useState } from "react";

import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Registeration from "./Pages/Registeration";
import { ToastContainer, toast } from "react-toastify";
import VerifyOtp from "./Pages/VerifyOtp";
import Login from "./Pages/Login";
import { useLocation } from "react-router-dom";
import { useUserContext } from "./contexts/UserContext";
import Home from "./Pages/Home";
import Nav from "./components/Nav";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Collection from "./Pages/Collection";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import PlaceOrder from "./Pages/PlaceOrder";
import Order from "./Pages/Order";
import OrderDetail from "./Pages/OrderDetail";

import ReturnRequests from "./Pages/ReturnRequests";

function App() {
  const { userData } = useUserContext();
  let location = useLocation();
  return (
    <>
      <ToastContainer />
      {userData?.isVerified && <Nav />}
      <Routes>
        <Route
          path="/signup"
          element={
            userData?.isVerified ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Registeration />
            )
          }
        />
        <Route
          path="/verify-otp"
          element={
            userData?.isVerified ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <VerifyOtp />
            )
          }
        />
        <Route
          path="/login"
          element={
            userData?.isVerified ? (
              <Navigate to={location.state?.from || "/"} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/"
          element={userData?.isVerified ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact"
          element={
            userData ? (
              <Contact />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/about"
          element={
            userData ? (
              <About />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/collection"
          element={
            userData?.isVerified ? <Collection /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/productdetail/:productId"
          element={
            userData?.isVerified ? (
              <ProductDetail />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/cart"
          element={
            userData?.isVerified ? (
              <Cart />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/placeorder"
          element={
            userData?.isVerified ? (
              <PlaceOrder />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/order"
          element={
            userData?.isVerified ? (
              <Order />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route
          path="/return"
          element={
            userData?.isVerified ? (
              <ReturnRequests />
            ) : (
              <Navigate to="/login" state={{ from: location.pathname }} />
            )
          }
        />
        <Route path="/order/:id" element={<OrderDetail />} />
      </Routes>
    </>
  );
}

export default App;
