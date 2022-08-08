import * as React from "react";
import "./ProductCard.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import apiClient from "../../services/apiClient";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState, useEffect } from "react";
//import { addToWishlist } from "../../../../api/models/product";

// Renders image, name, price, and category of products.
// Buttons allow users to add products to wishlist or shopping cart.
export default function ProductCard(props) {
  // console.log("hello product card");
  // console.log(props.product.name);
  // console.log(props.product.description);
  // console.log(props.product.id);

  // const [isClicked, setIsClicked] = useState(false);
  // useEffect(() => {
  //   const addTolist = async () => {
  //     console.log("isClicked");
  //     const { data, error } = await apiClient.addToWishlist(props.product.id);
  //     console.log("data in add to list", data);
  //     setIsClicked(false);
  //   };
  //   addTolist();
  //   console.log("data in add to list");
  // }, [isClicked]);

  // const addToWishlist = async () => {
  //   const { data, error } = await apiClient.addWishlist(props.product.id);
  // };
  // console.log("hello product card");
  // console.log(props.product.name);
  // console.log(props.product.description);
  // console.log(props.product.image);
  let navigate = useNavigate();

  //popup functions for the products
  function on() {
    document.getElementById("overlay").style.display = "block";
  }

  function off() {
    document.getElementById("overlay").style.display = "none";
  }

  console.log("Key: ", props.product.id);
  return (
    <div className="product-card">
      <div className="product-tumb">
        <img src={props.product.image} alt={props.product.name} />
      </div>
      <div className="product-details">
        <span className="product-category">{props.product.category}</span>
        <h4>
          {/* <Link to={"/products/" + props.product.id}>{props.product.name}</Link> */}
          <a
            href="#"
            onClick={() => {
              navigate("/products/" + props.product.id);
            }}
          >
            {console.log("Product Name: ", props.product.name)}
            {props.product.name}
          </a>
        </h4>
        {/* <p>{props.product.description}</p> */}
        <div className="product-bottom-details">
          <div className="product-price">${props.product.price}</div>
          <div className="product-links">
            <a href="">
              {/* <FavoriteBorderIcon /> */}
              <FavoriteBorderIcon
                onClick={() => apiClient.addToWishlist(props.product.id)}
              />
            </a>
            <a href="">
              <AddShoppingCartIcon
                onClick={() => apiClient.addToShoppingCart(props.product.id)}
              />
            </a>
          </div>
        </div>
      </div>

      <div id="overlay" onClick={off}>
        <div className="text">
          <h2
            style={{
              transform: "translateX(250px) translateY(30px)",
            }}
          >
            {props.product.name}
          </h2>
          <img src={props.product.image}></img>
          <div
            className="overlay-price"
            style={{
              transform: "translateY(-220px) translateX(245px)",
            }}
          >
            ${props.product.price}
          </div>
          <p>{props.product.description}</p>
        </div>
      </div>
    </div>
  );
}
