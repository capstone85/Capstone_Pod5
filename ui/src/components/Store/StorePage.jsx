import * as React from "react";
// import "./ExercisePage.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import StoreOverview from "./StoreOverview";
import StoreNew from "./StoreNew";
import StoreDetail from "./StoreDetail";
import "./StorePage.css";
import Footer from "../Footer/Footer";

//My Stores page (vendor)
export default function StorePage(props) {
  return (
    <div className="store-page">
      <main>
        <div className="banner">
          <h1>MY STORES</h1>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <StoreOverview
                store={props.store}
                user={props.user}
              ></StoreOverview>
            }
          ></Route>
          <Route
            path="/create"
            element={<StoreNew addStore={props.addStore}></StoreNew>}
          ></Route>
          <Route
            path="/id/:storeId"
            element={<StoreDetail store={props.store}></StoreDetail>}
          ></Route>
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}
