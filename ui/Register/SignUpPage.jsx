import * as React from "react";
import "./SignUpPage.css";
import SignUp from "./SignUp";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../src/components/Footer/Footer";

export default function SignUpPage(props) {
  const navigate = useNavigate();
  return (
    <div className="registration-page">
      {
        <SignUp
          user={props.user}
          setUser={props.setUser}
          // isLoggedIn={props.isLoggedIn}
          setIsLoggedIn={props.setIsLoggedIn}
        ></SignUp>
      }
      <Footer />
    </div>
  );
}
