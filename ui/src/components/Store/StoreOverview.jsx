import * as React from "react";
import StoreFeed from "./StoreFeed";
// import "./ExerciseOverview.css";
import { Link } from "react-router-dom";
import "./StoreOverview.css";

//My Stores page (vendor)
export default function StoreOverview(props) {
  return (
    <div className="store-overview">
      <div>
        {/* <h3>Overview</h3> */}
        <button className="header">
          <Link
            className="add-store"
            to="/store/create"
            style={{ textDecoration: "none" }}
          >
            Add Store
          </Link>
        </button>
      </div>
      <hr style={{ transform: "translateY(36px)", width: "1530px" }}></hr>
      <StoreFeed store={props.store} user={props.user}></StoreFeed>
    </div>
  );
}
