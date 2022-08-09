import * as React from "react";
import "./ProductCard.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import apiClient from "../../services/apiClient";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import FavoriteIcon from "@mui/icons-material/Favorite";

// //toast alert
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

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

  console.log("Key: ", props.product.id);

  const [btnClass, setBtnClass] = useState(false);

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
            <button
              onClick={() => {
                apiClient.addToWishlist(props.product.id);
                btnClass ? setBtnClass(false) : setBtnClass(true);
              }}
            >
              {/* <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              /> */}
              {/* <Alert variant="outlined" severity="info">
                This is an info alert — check it out!
              </Alert> */}
              {/* <FavoriteBorderIcon /> */}
              {btnClass ? (
                <FavoriteIcon style={{ color: "#B86B77" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </button>
            <button>
              <AddShoppingCartIcon
                onClick={() => apiClient.addToShoppingCart(props.product.id)}
              />
            </button>
            {/* <div>
              <button onClick={notify}>Notify!</button>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
