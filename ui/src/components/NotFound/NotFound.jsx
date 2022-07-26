import * as React from "react";
import "./NotFound.css";
// import Navbar from "../Navbar/Navbar";
// import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="NotFound">
      {/* <Navbar /> */}
      <h2>404 ERROR</h2>
      <p>Sorry, we couldn't find that page</p>

      <Box sx={{ "& button": { m: 1 } }} style={{ color: "#B86B77" }}>
        <div className="HomeButton">
          <Link to="/">
            <Button variant="text" size="large" style={{ color: "#B86B77" }}>
              Home
            </Button>
          </Link>
        </div>
      </Box>
    </div>
  );
};

export default NotFound;
