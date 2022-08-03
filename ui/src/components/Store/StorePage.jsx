import * as React from "react";
// import "./ExercisePage.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import StoreOverview from "./StoreOverview";
import StoreNew from "./StoreNew";
import StoreDetail from "./StoreDetail";

export default function StorePage(props) {
  return (
    <div className="store-page">
      <main>
        <div className="banner">
          <h1>My Stores</h1>
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
    </div>
  );
}
