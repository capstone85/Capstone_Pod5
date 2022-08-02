import * as React from "react";
import StoreFeed from "./StoreFeed";
// import "./ExerciseOverview.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function StoreOverview(props) {
  return (
    <div className="content">
      <div className="store-overview">
        <div className="header">
          <h3>Overview</h3>
          <Link
            className="add-store"
            to="/store/create"
            style={{ textDecoration: "none" }}
          >
            Add Store
          </Link>
        </div>
        <hr></hr>
        <StoreFeed store={props.store} user={props.user}></StoreFeed>
        <Footer />
      </div>
    </div>
  );
}
