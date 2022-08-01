import * as React from "react";
import "./SignUpPage.css";
import SignUp from "./SignUp";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage(props) {
  const navigate = useNavigate();
  return (
    <div className="registration-page">
      {
        <SignUp
          user={props.user}
          setUser={props.setUser}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        ></SignUp>
      }
    </div>
  );
}
