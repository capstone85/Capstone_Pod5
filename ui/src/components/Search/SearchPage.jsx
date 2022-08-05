import * as React from "react";
import "./SearchPage.css";
import SearchBar from "./Searchbar";
import Selector from "../Product/Filter";
import { useState } from "react";

export default function SearchPage(props) {
  // const [activeCategory, setActiveCategory] = useState("All Categories");
  // const categories = ["All Categories", "clothing", "accessories", "footwear"];
  return (
    <>
      <h1 className="page-head">Search for stores or styles.</h1>
      <div className="searchbar">
        <SearchBar
          handleOnSearchbarChange={props.handleOnSearchbarChange}
          setSearchBar={props.setSearchbar}
          products={props.products}
        />
      </div>
    </>
  );
}
