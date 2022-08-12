import SearchIcon from "@mui/icons-material/Search";
import "./LocationSearch.css";
import * as React from "react";
import { useState, useEffect } from "react";

import {
  BrowserRouter,
  Link,
  Route,
  Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
export default function LocationSearchBar(props) {
  const handleOnInputChange = (event) => {
    props.setLocation((f) => ({
      ...f,
      [event.target.name]: event.target.value,
    }));
    console.log("event ", event.target.name, event.target.value);
  };
  let navigate = useNavigate();
  // Makes axios get request to get individual product info
  useEffect(() => {
    console.log("userlocation", props.location);
  }, [props.location]);

  return (
    <div className="searchbar">
      <div className="searchinput">
        <TextField
          id="location"
          label="location"
          variant="standard"
          type="userlocation"
          name="userlocation"
          placeholder="Enter Zip cpde"
          value={props.location.userlocation}
          onChange={handleOnInputChange}
        />
      </div>

      <button className="findlocation" onClick={() => navigate("/store-page")}>
        Shops near You
      </button>
      <br />
      <p id="status"></p>
      <a id="map-link" target="_blank"></a>
    </div>
  );
}
