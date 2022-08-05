import * as React from "react";

import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
// icons used
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import DashboardLinks from "../MyAccount/DashboardLinks/DashboardLinks";
import Tooltip from "@mui/material/Tooltip";

//added for the dropdowm portion of the navbar
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import VendorNavbar from "../VendorNavbar/VendorNavbar";
import Navbar from "../Navbar/Navbar";
import App from "../../App";

export default function GeneralNavbar(props) {
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
    <Navbar
      handleLogout={props.handleLogout}
      isLoggedIn={props.isLoggedIn}
      setIsLoggedIn={props.setIsLoggedIn}
      setIsClicked={props.setIsClicked}
      user={props.user}
      setUser={props.setUser}
    />
  );
}
