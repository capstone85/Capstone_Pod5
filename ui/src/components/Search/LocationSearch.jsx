import SearchIcon from "@mui/icons-material/Search";
import "./LocationSearch.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";

export default function LocationSearchBar(props) {
  function geoFindMe() {
    const status = document.querySelector("#status");
    const mapLink = document.querySelector("#map-link");

    mapLink.href = "";
    mapLink.textContent = "";

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      status.textContent = "";
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }

    function error() {
      status.textContent = "Unable to retrieve your location";
    }

    if (!navigator.geolocation) {
      status.textContent = "Geolocation is not supported by your browser";
    } else {
      status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return (
    <div className="searchbar">
      <div className="searchinput">
        {/* Search input */}
        <input
          placeholder="Enter your location"
          className="input"
          value={props.searchBar}
          type="text"
        />
      </div>

      <button id="find-me" onClick={geoFindMe}>
        Find My Location
      </button>
      <br />
      <p id="status"></p>
      <a id="map-link" target="_blank"></a>

      {/* <button id="find-me">
        <SearchIcon className="search-icon" fontSize="large" />
      </button> */}
    </div>
  );
}
