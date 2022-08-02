import * as React from "react";
import "./ProductsPage.css";
import ProductGrid from "./ProductGrid";
import SearchBar from "../Search/Searchbar";
import Selector from "./Filter";
import Navbar from "../Navbar/Navbar";
import { sizing } from "@mui/system";
import Pagination from "@mui/material/Pagination";
import Footer from "../Footer/Footer";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import ProductCard from "./ProductCard";

// Renders header, searchbar, and product grid
export default function ProductsPage(props) {
  return (
    <>
      <div className="hero">
        <img
          className="hero-img"
          component="img"
          height="1000"
          width="900"
          src="https://fastly.4sqi.net/img/general/600x600/10468357_faxIDY_QLe6j9-OAT9OhRzEIAcem1RMrnAuv1f7dDhs.jpg"
          alt={props.name}
        />
      </div>
      <div className="side-container">
        <SearchBar
          handleOnSearchbarChange={props.handleOnSearchbarChange}
          setSearchBar={props.setSearchbar}
          products={props.products}
        />

        <ul className="categories">
          {props.categories.map((category, idx) => (
            <Selector
              key={idx}
              label={category}
              isActive={props.selectedCategory == category}
              onClick={() => {
                props.setActiveCategory(category);
              }}
            />
          ))}
        </ul>
      </div>
      <div className="product-grid-container">
        <ProductGrid
          products={props.products}
          handleAddItemToCart={props.handleAddItemToCart}
          handleRemoveItemFromCart={props.handleRemoveItemFromCart}
          shoppingCart={props.shoppingCart}
          setIsFetching={props.setIsFetching}
          searchbar={props.searchbar}
          store={props.store}
        />
        <ProductCard />
      </div>
      <div className="pagination">
        {/* <Pagination count={10} page={page} onChange={handleChange} /> */}

        <Pagination count={3} />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
