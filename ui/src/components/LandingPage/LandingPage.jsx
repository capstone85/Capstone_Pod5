import "./LandingPage.css";
import { useState } from "react";

import TextField from "@mui/material/TextField";
import LocationSearchBar from "../LocationSearch/LocationSearch";
import Footer from "../Footer/Footer";

export default function LandingPage() {
  const [searchBar, setSearchBar] = useState(""); // for search results

  // Sets value of search for filtering
  const handleOnSearchBarChange = (value) => {
    setSearchBar(value);
  };

  return (
    <div className="landing">
      <div className="thisdiv">
      <h1>Shop styles from stores near you.</h1>
      <h1>Enter your location to get started.</h1>
      <img src="https://t3.ftcdn.net/jpg/03/16/52/70/360_F_316527081_e2tXI5A3Zq9EzyKnFLSYNJXlQGsnTO5y.jpg" alt="bags"/>
      </div>
    
      <LocationSearchBar
        handleOnSearchBarChange={handleOnSearchBarChange}
        setSearchBar={setSearchBar}
      />
      <Footer />
    </div>
  );
}
