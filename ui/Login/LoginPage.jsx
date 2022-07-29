import * as React from "react";
import "./LoginPage.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

export default function LoginPage(props) {
  const navigate = useNavigate();
  useEffect(() => {
    //console.log("props user", props.user);
    // console.log("props category", props.user.category);
    // if (props.user) {
    //   if (props.user.category == "shopper") {
    //     console.log("props user", props.user.category);
    //   //  navigate("/");
    //   } else if (props.user.category == "vendor") {
    //     console.log("props user", props.user.category);
    //    // navigate("/store");
    //   }
    // }
  }, [props.user]);
  return (
    <div className="login-page">
      {/* {props.user?.user?.email ? (
        React.useEffect(() => {
          console.log(props);
          if (props.user.user.category === "shopper") {
            navigate("/"), [];
          } else if (props.user.user.category === "vendor") {
            navigate("/store"), [];
          }
        })
      ) : (
        <Login user={props.user} setUser={props.setUser}></Login>
      )} */}
      <Login user={props.user} setUser={props.setUser}></Login>
    </div>
  );
}
