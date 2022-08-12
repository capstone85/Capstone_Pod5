import * as React from "react";
import StoreFeed from "./StoreFeed";
// import "./ExerciseOverview.css";
import { Link } from "react-router-dom";
import "./StoreOverview.css";

//My Stores page (vendor)
export default function StoreOverview(props) {
  return (
    <div className="store-overview">
      <div className="store-overview-header">
        <hr style={{ transform: "translateY(50px)", width: "1530px" }}></hr>
      </div>
      <div className="add-store-btn-wrapper">
        <button className="add-store-btn">
          <Link
            className="add-store"
            to="/store/create"
            style={{ textDecoration: "none" }}
          >
            Add Store
          </Link>
        </button>
      </div>
      <div>
        <StoreFeed store={props.store} user={props.user}></StoreFeed>
      </div>
    </div>
  );
}
