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

// icons
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">This is Logo</div>
        <ul className="links">
          <li>
            {/*<Link to="/store_page">Shop</Link>*/}
            <button>Shop</button>
          </li>
          <li>
            {/* <Link to="/search"> */}
            <SearchIcon />
            {/* </Link> */}
          </li>
          <li>
            {/* <Link to="/wishlist"> */}
            <FavoriteBorderIcon />
            {/* </Link> */}
          </li>
          <li>
            {/* <Link to ="/shopping_cart"> */}
            <ShoppingCartOutlinedIcon />
            {/* </Link> */}
          </li>
          <li>
            {/* <Link to="/account"> */}
            <PersonOutlineOutlinedIcon />
            {/* </Link> */}
          </li>
        </ul>
        {/* <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>
        </Box> */}
      </div>
    </div>
  );
}
