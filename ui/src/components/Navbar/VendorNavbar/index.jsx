import * as React from "react";
import "./VendorNavbar.css";
import { Link } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

// icons used
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

//added for the dropdowm portion of the vendor navbar
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function VendorNavbar(props) {
  const navigate = useNavigate();
  //dropdown for the profile icon in the vendor navbar
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="vendor navbar">
      <div className="container">
        {/* logo link */}
        <div className="logo">
          <Link to="/store" style={{ color: "white" }}>
            SEQUOIA
          </Link>
        </div>
        {/* vender links */}
        <ul className="vendor-links">
          {/* login and log out */}

          {/* navbar links */}
          <ul className="links">
            <li>
              {props.isLoggedIn ? (
                <div className="vendLogoutButton">
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

            {/* stores link */}
            {/* <li>
              <div className="store-page">
                <Link to="/store-page">
                  <Typography>Stores</Typography>
                </Link>
              </div>
            </li> */}

            {/* myStore link */}
            <li>
              <div className="myStores">
                <Link to="/store">
                  <Typography>My Stores</Typography>
                </Link>
              </div>
            </li>

            <li>
              <div className="vendorAccount">
                <Tooltip title="Vendor Account">
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
                          <Link to="/vendorDashboard">
                            <Typography>Dashboard</Typography>
                          </Link>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <Link to="/StoreOrders">
                            <Typography>Store Orders</Typography>
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
                            <Typography>Sign Up</Typography>
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
        </ul>
      </div>
    </div>
  );
}
