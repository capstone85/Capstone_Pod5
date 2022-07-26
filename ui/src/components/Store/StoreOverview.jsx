import * as React from "react";
import StoreFeed from "./StoreFeed";
// import "./ExerciseOverview.css";
import { Link } from "react-router-dom";

export default function StoreOverview(props) {
  return (
    <div className="content">
      <div className="store-overview">
        <div className="header">
          <h3>Overview</h3>
          <Link className="add-e" to="/store/create">
            Add Store
          </Link>
        </div>
        <StoreFeed store={props.store} user={props.user}></StoreFeed>
      </div>
    </div>
  );
}
