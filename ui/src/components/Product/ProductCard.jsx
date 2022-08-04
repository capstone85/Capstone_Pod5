import * as React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import apiClient from "../../services/apiClient";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// Renders image, name, price, and category of products.
// Buttons allow users to add products to wishlist or shopping cart.
export default function ProductCard(props) {
  console.log("hello product card");
  console.log(props.product.name);
  console.log(props.product.description);
  console.log(props.product.id);
  const addToWishlist = async () => {
    const { data, error } = await apiClient.addWishlist(props.product.id);
  };
  // console.log("hello product card");
  // console.log(props.product.name);
  // console.log(props.product.description);
  console.log(props.product.image);
  return (
    <div className="product-card">
      <div className="product-tumb">
        <img src={props.product.image} alt={props.product.name} />
      </div>
      <div className="product-details">
        <span className="product-category">{props.product.category}</span>
        <h4>
          <a href="">{props.product.name}</a>
        </h4>
        {/* <p>{props.product.description}</p> */}
        <div className="product-bottom-details">
          <div className="product-price">${props.product.price}</div>
          <div className="product-links">
            <a href="">
              {/* <FavoriteBorderIcon /> */}
              <FavoriteBorderIcon onClick={addToWishlist(props.product.id)} />
            </a>
            <a href="">
              <AddShoppingCartIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
