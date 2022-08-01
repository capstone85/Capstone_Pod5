import * as React from "react";
import "./ProductsPage.css";
import ProductGrid from "./ProductGrid";
import SearchBar from "./ProductSearch";
import Selector from "./ProductCategories";
import Navbar from "../Navbar/Navbar";

// Renders header, searchbar, and product grid
export default function ProductsPage(props) {
  return (
    <div className="products">
      <SearchBar
        handleOnSearchbarChange={props.handleOnSearchbarChange}
        setSearchBar={props.setSearchbar}
        products={props.products}
      />

      <div className="selector">
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
      </div>

      <ProductGrid
        products={props.products}
        handleAddItemToCart={props.handleAddItemToCart}
        handleRemoveItemFromCart={props.handleRemoveItemFromCart}
        shoppingCart={props.shoppingCart}
        setIsFetching={props.setIsFetching}
        searchbar={props.searchbar}
      />
    </div>
  );
}
