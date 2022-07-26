import * as React from "react";
import "./DashboardLinks.css";
import { Link } from "react-router-dom";

export default function DashboardLinks() {
  return (
    <div className="dashboard-links">
      <ul className="links">
        <li>
          <Link to="/dashboard"> Dashboard</Link>
        </li>
        <li>Orders</li>
        <li>Logout</li>
      </ul>
    </div>
  );
}
