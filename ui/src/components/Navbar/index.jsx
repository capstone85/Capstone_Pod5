import * as React from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// icons used

//added for the dropdowm portion of the navbar
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import VendorNavbar from "./VendorNavbar";
import ShopperNavbar from "./ShopperNavbar";

export default function Navbar(props) {
  const isVendor = props.user?.category === "vendor";
  useEffect(() => {
    console.log(props.user);
  }, [props.user]);
  return isVendor ? (
    <VendorNavbar
      handleLogout={props.handleLogout}
      isLoggedIn={props.isLoggedIn}
      setIsLoggedIn={props.setIsLoggedIn}
      user={props.user}
      setUser={props.setUser}
    />
  ) : (
    <ShopperNavbar
      handleLogout={props.handleLogout}
      isLoggedIn={props.isLoggedIn}
      setIsLoggedIn={props.setIsLoggedIn}
      setIsClicked={props.setIsClicked}
      user={props.user}
      setUser={props.setUser}
    />
  );
}
