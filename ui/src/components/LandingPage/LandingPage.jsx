import "./LandingPage.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import LocationSearchBar from "../Search/LocationSearch";
import Footer from "../Footer/Footer";

export default function LandingPage(props) {
  const [searchBar, setSearchBar] = useState(""); // for search results

  // Sets value of search for filtering
  const handleOnSearchBarChange = (value) => {
    setSearchBar(value);
  };

  return (
    <div className="landing">
      <div className="landing-text">
        <h1>Shop styles from stores near you.</h1>
        <h1>Enter your location to get started.</h1>
        <div className="landing-image">
          <img
            src="https://t3.ftcdn.net/jpg/03/16/52/70/360_F_316527081_e2tXI5A3Zq9EzyKnFLSYNJXlQGsnTO5y.jpg"
            alt="bags"
          />
        </div>
        <div className="location-searchbar">
          <LocationSearchBar
            handleOnSearchBarChange={handleOnSearchBarChange}
            setSearchBar={setSearchBar}
            location={props.location}
            setLocation={props.setLocation}
          />
        </div>

        <Footer />
      </div>
    </div>
  );
}
