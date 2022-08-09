/* * * * NOT USED * * * */

import "./ProductDetail.css";

import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import NotFound from "../NotFound/NotFound";
import ProductView from "./ProductView";
import Footer from "../Footer/Footer";

import CircularProgress from "@mui/material/CircularProgress";

// Fetches data from API, renders loading page, retrieves product description
export default function ProductDetail(props) {
  const [product, setProduct] = useState("");

  // Extract productId parameter from the url
  let { productId } = useParams();
  let quantity = 0;
  useEffect(() => {
    // Makes axios get request to get individual product info
    async function getInfo() {
      props.setIsFetching(true);
      await axios
        .get(`http://localhost:5174/product/${productId}`)
        .then((response) => {
          setProduct(response.data.product);
          props.setIsFetching(false);
        })
        .catch((error) => {
          <NotFound />;
        });
    }
    getInfo();
  }, []);

  // If still fetching, render loading page
  if (props.isFetching) {
    return (
      <div className="loading">
        <h1>
          <CircularProgress color="secondary" />
        </h1>
      </div>
    );
  }
  // } else {
  //   const currItem = props.shoppingCart.find((item) => {
  //     return item.itemId == productId;
  //   });

  if (typeof currItem != "undefined") {
    quantity = currItem.quantity;
  }

  return (
    <>
      <div className="product-detail">
        <ProductView
          product={product}
          // name={product.name}
          // description={product.description}
          productId={productId}
          quantity={quantity}
          handleAddItemToCart={props.handleAddItemToCart}
          handleRemoveItemFromCart={props.handleRemoveItemFromCart}
          setIsFetching={props.setIsFetching}
        />
      </div>
      <Footer />
    </>
  );
}
