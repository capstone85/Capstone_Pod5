import * as React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import apiClient from "../../services/apiClient";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Navigate, useNavigate } from "react-router-dom";

// Renders image, name, price, and category of products.
// Buttons allow users to add products to wishlist or shopping cart.
export default function ProductCard(props) {
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

  const [btnClassCart, setBtnClassCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  console.log(props.product);

  useEffect(() => {
    async function wishlist() {
      const a = await apiClient.checkIfInWishlist(props.product.id);
      setIsInWishlist(a.data.isInWishlist);
    }
    wishlist();
  }, []);

  let navigate = useNavigate();

  return (
    <div className="product-card">
      <div className="product-tumb">
        <img src={props.product.image} alt={props.product.name} />
      </div>
      <div className="product-details">
        <span className="product-category">{props.product.category}</span>
        <h4>
          <a
            href="#"
            onClick={() => {
              navigate("/products/" + props.product.id);
            }}
          >
            {props.product.name}
          </a>
        </h4>
        <div className="product-bottom-details">
          <div className="product-price">${props.product.price}</div>
          <div className="product-links">
            <button
              onClick={async () => {
                const a = await apiClient.checkIfInWishlist(props.product.id);
                setIsInWishlist(a.data.isInWishlist);
                if (isInWishlist) {
                  setIsInWishlist(false);
                  apiClient.removeFromWishlist(props.product.id);
                } else {
                  setIsInWishlist(true);
                  apiClient.addToWishlist(props.product.id);
                }
              }}
            >
              {isInWishlist ? (
                <FavoriteIcon style={{ color: "#B86B77" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </button>
            <button
              onClick={async () => {
                const a = await apiClient.checkIfInCart(props.product.id);
                const isInCart = a.data.isInShoppingCart;
                if (isInCart) {
                  apiClient.incrementProductQuantity(props.product.id);
                } else {
                  apiClient.addToShoppingCart(props.product.id);
                }
                setBtnClassCart(true);
              }}
            >
              {/* <FavoriteBorderIcon /> */}
              {btnClassCart ? (
                <AddShoppingCartIcon style={{ color: "#B86B77" }} />
              ) : (
                <AddShoppingCartIcon />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
