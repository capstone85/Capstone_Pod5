import "./LandingPage.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import LocationSearchBar from "../Search/LocationSearch";
import Footer from "../Footer/Footer";

export default function LandingPage() {
  const [searchBar, setSearchBar] = useState(""); // for search results

  // Sets value of search for filtering
  const handleOnSearchBarChange = (value) => {
    setSearchBar(value);
  };

  return (
    <div className="landing">
      <h1>Shop styles from stores near you.</h1>
      <h1>Enter your location to get started.</h1>
      <LocationSearchBar
        handleOnSearchBarChange={handleOnSearchBarChange}
        setSearchBar={setSearchBar}
      />
      <Footer />
    </div>
  );
}
