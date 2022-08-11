import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ClearIcon from "@mui/icons-material/Clear";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Checkout from "../Checkout/Checkout";
import "./Shoppingcart.css";

import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";

export default function CartItem({ item, idx }) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    async function wishlist() {
      const a = await apiClient.checkIfInWishlist(item.product_id);
      setIsInWishlist(a.data.isInWishlist);
    }
    wishlist();
  }, []);

  //   useEffect(() => {
  //     console.log("cartitem page loaded");
  //   }, []);

  console.log("QUANTITY", item);

  console.log("QUANTITY", item.quantity);

  return (
    <div className="item">
      <div className="buttons">
        <span
          className="delete-btn"
          onClick={() => {
            apiClient.removeFromCart(item.product_id);
            window.location.href = "";
          }}
        >
          <ClearIcon />
        </span>
        <span
          className="like-btn"
          onClick={async () => {
            const a = await apiClient.checkIfInWishlist(item.product_id);
            setIsInWishlist(a.data.isInWishlist);
            console.log("IS IN WISHLIST? ", isInWishlist);
            if (isInWishlist) {
              setIsInWishlist(false);
              apiClient.removeFromWishlist(item.product_id);
            } else {
              setIsInWishlist(true);
              apiClient.addToWishlist(item.product_id);
            }
          }}
        >
          {isInWishlist ? (
            <FavoriteIcon style={{ color: "#B86B77" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </span>
      </div>
      <div className="image">
        <img
          className="product-img"
          src={item.product_image}
          alt={item.product_name}
        />
      </div>
      <div className="description">
        <span className="store">{item.store_name}</span>
        <span className="name">{item.product_name}</span>
      </div>
      <span className="price">${item.product_price}</span>
      <div className="quantity">
        <span> Quantity: {item.quantity}</span>
        <button
          className="minus-btn"
          type="button"
          name="button"
          onClick={() => {
            apiClient.decrementProductQuantity(item.product_id);
            if (item.quantity - 1 === 0) {
              apiClient.removeFromCart(item.product_id);
            }
            window.location.href = "";
          }}
        >
          -
        </button>
        <button
          className="plus-btn"
          type="button"
          name="button"
          onClick={() => {
            apiClient.incrementProductQuantity(item.product_id);
            window.location.href = "";
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
