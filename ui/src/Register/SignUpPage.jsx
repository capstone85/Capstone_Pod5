import * as React from "react";
import "./SignUpPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage(props) {
  const navigate = useNavigate();
  return (
    <div className="registration-page">
      {<Signup user={props.user} setUser={props.setUser}></Signup>}
    </div>
  );
}
