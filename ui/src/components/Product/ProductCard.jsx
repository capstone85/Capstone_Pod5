import * as React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import apiClient from "../../services/apiClient";

// Renders image, name, price, and quantity of products.
// Buttons allow users to change quantity of products.
export default function ProductCard(props) {
  console.log("hello product card");
  console.log(props.product.name);
  console.log(props.product.description);
  console.log(props.product.id);
  const addToWishlist = async () => {
    const { data, error } = await apiClient.addWishlist(props.product.id);
  };
  return (
    <div class="product-card">
      <div class="product-tumb">
        <img src={props.product.image} alt="" />
      </div>
      <div class="product-details">
        <span class="product-category">{props.product.category}</span>
        <h4>
          <a href="">{props.product.name}</a>
        </h4>
        <p>{props.product.description}</p>
        <div class="product-bottom-details">
          <div class="product-price">{props.product.price}</div>
          <div class="product-links">
            <a href="">
              {/* <FavoriteBorderIcon /> */}
              <FavoriteBorderIcon onClick={addToWishlist(props.product.id)} />
            </a>
            <a href="">
              <ShoppingCartOutlined />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
