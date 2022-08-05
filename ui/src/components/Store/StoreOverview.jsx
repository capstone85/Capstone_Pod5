import * as React from "react";
import StoreFeed from "./StoreFeed";
// import "./ExerciseOverview.css";
import { Link } from "react-router-dom";
import { flexbox } from "@mui/system";

//My Stores page (vendor)
export default function StoreOverview(props) {
  return (
    <div className="content">
      <div className="store-overview">
        {/* <hr></hr> */}
        {/* <StoreFeed store={props.store} user={props.user}></StoreFeed> */}
        <div className="header">
          {/* <h3>Overview</h3> */}
          <button
            style={{
              // border: " 1px solid",

              transform: "translateX(1100px) translateY(5px)",
            }}
          >
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
    </div>
  );
}
