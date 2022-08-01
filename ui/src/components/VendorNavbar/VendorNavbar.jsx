import * as React from "react";
import "./VendorNavbar.css";
import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

// icons used

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export default function VendorNavbar(props) {
  const navigate = useNavigate();
  return (
    <div className="vender">
      <div className="container">
        {/* logo link */}
        <div className="logo">
          <Link to="/store">🛍</Link>
        </div>
        {/* vender links */}
        <ul className="vender-links">
          {/* login and log out */}
          <li>
            {props.isLoggedIn ? (
              <Typography
                className="logoutButton"
                onClick={() => {
                  props.handleLogout();
                  navigate("/login");
                }}
              >
                Logout
              </Typography>
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

          {/* stores link */}
          <li className="store-page">
            <Link to="/store-page">
              <Typography>Stores</Typography>
            </Link>
          </li>

          {/* myStore link */}
          <li className="myStores">
            <Link to="/store">
              <Typography>My Stores</Typography>
            </Link>
          </li>

          <li>
            <Link to="/vendorAccount">
              <PersonOutlineOutlinedIcon sx={{ width: 30, height: 30 }} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
