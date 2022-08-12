import * as React from "react";
import "./ShopperNavbar.css";
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
import ShoppingCart from "../../ShoppingCart/ShoppingCart";
import DashboardLinks from "../../MyAccount/DashboardLinks/DashboardLinks";
import Tooltip from "@mui/material/Tooltip";

//added for the dropdowm portion of the navbar
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

//badge for the shopping cart icon
import Badge from "@mui/material/Badge";

export default function ShopperNavbar(props) {
  const [showbutton, setshowbutton] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setshowbutton(!window.location.pathname.startsWith("/login"));
  }, [window.location.pathname]);

  useEffect(() => {
    // console.log("navbar", props.isLoggedIn);
  }, [props.isLoggedIn]);

  //dropdown for the profile icon in the navbar
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [error, setError] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //-------------------
  if (error) {
    setError(error);
  }
  return (
    <div className="navbar shopper">
      {/* logo link*/}
      <div className="logo">
        <Link to="/" style={{ color: "white" }}>
          SEQUOIA
        </Link>
      </div>

      {/* navbar links */}
      {/* login and logout portion */}
      <ul className="links">
        {/* <li>
          <Button
            sx={{ backgroundColor: "green", sm: { backgroundColor: "red" } }}
          >
            Button
          </Button>
        </li> */}
        <li>
          {props.isLoggedIn ? (
            <div className="logoutButton">
              <Typography
                className="logoutButton"
                onClick={() => {
                  props.handleLogout();
                  navigate("/login");
                }}
              >
                Logout
              </Typography>
            </div>
          ) : (
            <>
              <div className="loginButton">
                <Link to="/login">
                  <Typography>Login</Typography>
                </Link>
              </div>
            </>
          )}
        </li>

        {/* store link */}
        {/* <li className="shop-link">
          <Link to="/store-page">
            <Typography>Shop</Typography>
          </Link>
        </li> */}

        <li className="shop-link">
          {props.location ? (
            <Link to="/store-page">
              <Typography>Shop</Typography>
            </Link>
          ) : (
            <Tooltip title="Please enter your zip code">
              <Link to="/">
                <Typography>Shop</Typography>
              </Link>
            </Tooltip>
          )}
        </li>

        {/* search link */}
        <li>
          <Tooltip title="Search">
            <Link to="/search">
              <SearchIcon />
            </Link>
          </Tooltip>
        </li>
        {/* <li className="sidebar">
              <Link to="/sidebar">
                <Typography>Here</Typography>
              </Link>
            </li> */}

        {/* wishlist link --> */}
        <li>
          {props.isLoggedIn ? (
            <Tooltip title="Wishlist">
              <Link to="/wishlist">
                <FavoriteBorderIcon />
              </Link>
            </Tooltip>
          ) : (
            <Tooltip title="Must be logged in to view the page">
              <Link to="/login">
                <FavoriteBorderIcon />
              </Link>
            </Tooltip>
          )}
        </li>

        {/* shopping cart link */}
        <li>
          <Tooltip title="Shopping Cart">
            <Link to="/shopping-cart">
              {/* <Badge color="info" badgeContent={5}> */}
              <ShoppingCartOutlinedIcon />
              {/* </Badge> */}
            </Link>
          </Tooltip>
        </li>

        {/* My profile portion link that includes dropdowm */}
        <li>
          <div className="account">
            <Tooltip title="Account settings">
              <Typography
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <PersonOutlineOutlinedIcon sx={{ width: 30, height: 30 }} />
              </Typography>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {/* dropdown links */}
              <div className="dropdown-links">
                {/* if user is logged in --> should see dashboard, my orders, and log out, otherwise --> should see login and signup */}
                {props.isLoggedIn ? (
                  <>
                    <MenuItem onClick={handleClose}>
                      <Link to="/dashboard">
                        <Typography>Dashboard</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link to="/orders">
                        <Typography>My Orders</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Typography
                        onClick={() => {
                          props.handleLogout();
                          navigate("/login");
                        }}
                      >
                        Logout
                      </Typography>
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={handleClose}>
                      <Link to="/register">
                        <Typography>Register</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link to="/login">
                        <Typography>Login</Typography>
                      </Link>
                    </MenuItem>
                  </>
                )}
              </div>
            </Menu>
          </div>
        </li>
      </ul>
    </div>
  );
}
