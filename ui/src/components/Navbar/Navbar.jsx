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

// icons used
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCart from "../Shoppingcart/Shoppingcart";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="container">
        {/* logo part */}
        <div className="logo">
          <Link to="/">&#x1F975;</Link>
        </div>
        {/* navbar links */}
        <ul className="links">
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
            <Link to="/login">
              <PersonOutlineOutlinedIcon />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
