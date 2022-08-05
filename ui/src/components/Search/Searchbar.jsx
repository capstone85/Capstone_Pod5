import "./Searchbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import ProductCard from "../Product/ProductCard";
import Selector from "../Product/Filter";

export default function Searchbar(props) {
  return (
    <div className="searchbar-section">
    <div className="searchbar">
      <input
        placeholder="Search"
        className="input"
        value={props.searchbar}
        onChange={(event) =>
          props.handleOnSearchbarChange(event.target.value)
        }
      />
      <div className="search-icon">
        <SearchIcon />
      </div>
      
    </div>
  </div>
  );
}
