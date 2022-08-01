import * as React from "react";
import "./Dashboard.css";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Dashboard(props) {
  useEffect(() => {
    console.log("dashboard", props.user);
  }, [props.user]);

  return (
    <div className="body">
      <p>
        Hello {props.user ? props.user.first_name : null} (not{" "}
        {props.user.first_name}?{" "}
        <Link
          to="/login"
          className="logoutButton"
          onClick={() => {
            props.handleLogout();
            // navigate("/login");
          }}
        >
          Logout
        </Link>
        )
      </p>
      <p>
        From your account dashboard you can view your{" "}
        <Link to="/orders">recent orders</Link>, manage your shipping and
        billing addresses, and edit your password and account details.
      </p>
    </div>
  );
}
