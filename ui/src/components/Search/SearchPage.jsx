import * as React from "react";
import "./SearchPage.css";
import SearchBar from "./Searchbar";
import Selector from "../Product/Filter";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import ProductCard from "../Product/ProductCard";
import ProductGrid from "../Product/ProductGrid";

export default function SearchPage(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const categories = ["All Categories", "clothing", "accessories", "footwear"];

  let foundSearch = false;

  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetching(true);

      const { data, error } = await apiClient.listAllProducts();
      if (error) {
        setError(error);
      }
      if (data) {
        console.log("data", data.products);
        setProduct(data.products);
      }
      setIsFetching(false);
    };

    fetchProducts();
  }, []);

  const currentItems = product.filter((item) => {
    console.log(item.category);
    return item.category == activeCategory;
  });

  return (
    <>
      <h1 className="page-head">Search styles across stores near you.</h1>
      <div className="searchbar">
        <SearchBar
          handleOnSearchbarChange={props.handleOnSearchbarChange}
          setSearchBar={props.setSearchbar}
          product={product}
        />
      </div>
      <div className="category">
        <ul className="categoryList">
          {categories.map((category, idx) => (
            <Selector
              key={idx}
              category={category}
              isActive={activeCategory == category}
              onClick={() => {
                setActiveCategory(category);
              }}
            />
          ))}
        </ul>
      </div>
      <div className="product-gridSearch">
        <ProductGrid
          handleAddItemToCart={props.handleAddItemToCart}
          handleRemoveItemFromCart={props.handleRemoveItemFromCart}
          shoppingCart={props.shoppingCart}
          setIsFetching={props.setIsFetching}
          searchbar={props.searchbar}
          store={props.store}
          product={activeCategory == "All Categories" ? product : currentItems}
        />
      </div>
    </>
  );
}
