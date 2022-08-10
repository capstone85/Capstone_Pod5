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

// //toast alert
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

//import { addToWishlist } from "../../../../api/models/product";

// Renders image, name, price, and category of products.
// Buttons allow users to add products to wishlist or shopping cart.
export default function ProductCard(props) {
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
  const [btnClassWishlist, setBtnClassWishlist] = useState(false);
  const [btnClassCart, setBtnClassCart] = useState(false);

  let navigate = useNavigate();

  //notify function for the toast popup
  // const notify = () =>
  //   toast("🦄 Wow so easy!", {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
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
            {console.log("Product Name: ", props.product.name)}
            {props.product.name}
          </a>
        </h4>
        {/* <p>{props.product.description}</p> */}
        <div className="product-bottom-details">
          <div className="product-price">${props.product.price}</div>
          <div className="product-links">
            <button
              onClick={async () => {
                const a = await apiClient.checkIfInWishlist(props.product.id);
                const isInWishlist = a.data.isInWishlist;
                if (isInWishlist) {
                  null;
                } else {
                  setBtnClassWishlist(true);
                  apiClient.addToWishlist(props.product.id);
                }
              }}
            >
              {/* <FavoriteBorderIcon /> */}
              {btnClassWishlist ? (
                <FavoriteIcon style={{ color: "#B86B77" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </button>
            <button
              onClick={async () => {
                const a = await apiClient.checkIfInCart(props.product.id);
                console.log("THIS IS A", a);
                const isInCart = a.data.isInShoppingCart;
                console.log("THIS IS A", isInCart);
                if (isInCart) {
                  // intsead of null, call apiClient.incrementQuantity
                  null;
                } else {
                  setBtnClassCart(true);
                  apiClient.addToShoppingCart(props.product.id);
                }
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
