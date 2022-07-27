import * as React from "react";
import "./DashboardLinks.css";
import { Link } from "react-router-dom";
import apiClient from "../../../services/apiClient";
import { useNavigate } from "react-router-dom";
export default function DashboardLinks(props) {
  const navigate = useNavigate();
  return (
    <div className="dashboard-links">
      <ul className="links">
        <li>
          <Link to="/dashboard"> Dashboard</Link>
        </li>
        <li>
          <Link to="/orders">Orders</Link>
        </li>
        {/* {props.user ? (
          <li className="btn">
            <button
              onClick={() => {
                props.handleLogout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )} */}

        {/* <li>Logout</li> */}
      </ul>
    </div>
  );
}
