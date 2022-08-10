import SearchIcon from "@mui/icons-material/Search";
import "./LocationSearch.css";
import * as React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
export default function LocationSearchBar(props) {
  const [form, setForm] = useState({
    userlocation: "",
  });
  const [difference, setDifference] = useState(null);
  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
    console.log("event ", event.target.name, event.target.value);
  };

  // Makes axios get request to get individual product info
  async function getDifference(props) {
    await axios
      .get(
        `https://zipcodeapi.com/rest/js-Jo8L4fqW6lLGx9uuk7CopIhS0Epzg3PoQjoe2ZoFdq5jXLbZGNvvYxmj5xdiS3cg/distance.json/${form.userlocation}/${form.userlocation}/km
`
      )
      .then((response) => {
        setDifference(response.data);
        console.log(response);
      });
  }


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
          value={form.userlocation}
          onChange={handleOnInputChange}
        />
      </div>

      <button
        className="findlocation"
        onClick={
          getDifference
       
        }
      >
        Shops near You
      </button>
      <br />
      <p id="status"></p>
      <a id="map-link" target="_blank"></a>

    
    </div>
  );
}
