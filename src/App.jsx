import React, { useState } from "react";
import "./App.css";
// Routers
import { Routes, Route, Link } from "react-router-dom";
import SignIn from "./components/auth/signin";
import SignUp from "./components/auth/Signup";
import ForgotPassword from "./components/auth/Forgot-Password/ForgotPassword";
import ResetPassword from "./components/auth/Forgot-Password/ResetPassword";
import VerifyCodePassword from "./components/auth/Forgot-Password/VerifyCodePassword";
import MainHome from "./components/Home/MainHome";

function App() {

  return (
    <Routes>
      <Route path="*" element={<>404</>} />
      <Route
        path="/"
        element={
          <div className="bg-[#DEE2E7]">
            <MainHome />
          </div>
        }
      />
      <Route
        path="/auth/sign-in"
        element={
          <>
            <SignIn />
          </>
        }
      />
      <Route
        path="/auth/sign-up"
        element={
          <>
            <SignUp />
          </>
        }
      />
      <Route
        path="/auth/forgot-password"
        element={
          <>
            <ForgotPassword />
          </>
        }
      />
      <Route
        path="/auth/forgot-password/verify-code"
        element={
          <>
            <VerifyCodePassword />
          </>
        }
      />
      <Route
        path="/auth/forgot-password/reset-password"
        element={
          <>
            <ResetPassword />
          </>
        }
      />
    </Routes>
  );
}

export default App;
