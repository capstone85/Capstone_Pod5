import * as React from "react";
import "./ProductsPage.css";
import ProductGrid from "./ProductGrid";
import SearchBar from "../Search/Searchbar";
import Selector from "./Filter";
import Navbar from "../Navbar/Navbar";
import { Card } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { sizing } from "@mui/system";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";

import axios from "axios";

// Renders header, searchbar, and product grid
export default function ProductsPage(props) {
  const [product, setProduct] = useState([]);

  // Extract productId parameter from the url
  let { storeId } = useParams();
  useEffect(() => {
    // Makes axios get request to get individual product info
    async function getInfo() {
      props.setIsFetching(true);
      await axios
        .get(`http://localhost:5174/product/store/${storeId}`)
        .then((response) => {
          console.log(response.data.product);
          setProduct(response.data.product);
          props.setIsFetching(false);
          console.log("products:" + product[0].name);
        })
        .catch((error) => {
          <NotFound />;
        });
    }
    getInfo();
  }, []);

  return (
    <>
      <Card sx={({ maxHeight: "100px" }, { maxWidth: "35%" })} className="hero">
        <CardMedia
          component="img"
          height="200"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1024px-H%26M-Logo.svg.png"
          alt={props.name}
        />
      </Card>
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
          handleAddItemToCart={props.handleAddItemToCart}
          handleRemoveItemFromCart={props.handleRemoveItemFromCart}
          shoppingCart={props.shoppingCart}
          setIsFetching={props.setIsFetching}
          searchbar={props.searchbar}
          store={props.store}
          product={product}
          storeId={storeId}
        />
      </div>
      <Footer />
    </>
  );
}
