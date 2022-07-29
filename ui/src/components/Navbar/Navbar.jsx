import * as React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
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
import ShoppingCart from "../Shoppingcart/Shoppingcart";
import DashboardLinks from "../MyAccount/DashboardLinks/DashboardLinks";

export default function Navbar(props) {
  const [showbutton, setshowbutton] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setshowbutton(!window.location.pathname.startsWith("/login"));
    //setshown(true)
  }, [window.location.pathname]);
  return (
    <div className="navbar">
      <div className="container">
        {/* logo part */}
        <div className="logo">
          <Link to="/">🛍</Link>
        </div>
        {/* navbar links */}
        <ul className="links">
          <li>
            {(props.user && showbutton)? (
              <button
                onClick={() => {
                  props.handleLogout();
                  navigate("/login");
                }}
              >
                Logout
              </button>
            ) : (
              <>
                <button>
                  <Link to="/login">Login</Link>
                </button>
              </>
            )}
          </li>
          <div className="shop">
            <li>
              <Link to="/store-page">Shop</Link>
              {/* <button>Shop</button> */}
            </li>
          </div>
          <li>
            <Link to="/search">
              <SearchIcon />
            </Link>
          </li>
          <li>
            <Link to="/wishlist">
              <FavoriteBorderIcon />
            </Link>
          </li>
          <li>
            <Link to="/shopping-cart">
              <ShoppingCartOutlinedIcon />
            </Link>
          </li>
          <li>
            {/* <Link to="/login"> */}
            <Link to="/dashboard">
              <PersonOutlineOutlinedIcon />
            </Link>

            {/* <DashboardLinks
                handleLogout={props.handleLogout}
                isLogin={props.isLogin}
                user={props.user}
                setUser={props.setUser}
              /> */}
          </li>
        </ul>
      </div>
    </div>
  );
}
