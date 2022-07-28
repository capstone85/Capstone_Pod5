import * as React from "react";
import "./VendorNavbar.css";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

// icons used
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCart from "../Shoppingcart/Shoppingcart";
import DashboardLinks from "../MyAccount/DashboardLinks/DashboardLinks";

export default function VendorNavbar(props) {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="container">

      
        {/* navbar links */}
        <ul className="links">
          <li>
            {props.user ? (
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
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </li>
          <div className="mystore">
            <li>
              <Link to="/store-page">My store</Link>
              {/* <button>Shop</button> */}
            </li>
          </div>
          <div className="addstore">
            <li>
              <Link to="/store">Add store</Link>
              {/* <button>Shop</button> */}
            </li>
          </div>
    
        </ul>
      </div>
    </div>
  );
}
