import * as React from "react";
import "./SearchPage.css";
import SearchBar from "./Searchbar";

export default function SearchPage(props) {
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
