import * as React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

// Renders image, name, price, and category of products.
// Buttons allow users to add products to wishlist or shopping cart.
export default function ProductCard(props) {
  // console.log("hello product card");
  // console.log(props.product.name);
  // console.log(props.product.description);
  console.log(props.product.image);
  return (
<<<<<<< HEAD
    // <div className="product-card">
    //   <h1 className="product-name">product: {props.product.name}</h1>

    //   <div className="buttons">
    //     <button
    //       className="remove"
    //       onClick={() => {
    //         props.handleRemoveItemFromCart(props.productId);
    //       }}
    //     >
    //       -
    //     </button>
    //     <button
    //       className="add"
    //       onClick={() => {
    //         props.handleAddItemToCart(props.productId);
    //       }}
    //     >
    //       +
    //     </button>
    //   </div>
    // </div>
    <div className="product-card">
      <div className="product-tumb">
        <img src={props.product.image} alt="" />
=======
    <div className="product-card">
      <div className="product-tumb">
        <img src={props.product.image} alt={props.product.name} />
>>>>>>> d5e401218d4e17c8f81d3abd48ebeb1865b67a7a
      </div>
      <div className="product-details">
        <span className="product-category">{props.product.category}</span>
        <h4>
          <a href="">{props.product.name}</a>
        </h4>
<<<<<<< HEAD
        <p>{props.product.description}</p>
        <div className="product-bottom-details">
          <div className="product-price">{props.product.price}</div>
=======
        {/* <p>{props.product.description}</p> */}
        <div className="product-bottom-details">
          <div className="product-price">${props.product.price}</div>
>>>>>>> d5e401218d4e17c8f81d3abd48ebeb1865b67a7a
          <div className="product-links">
            <a href="">
              <FavoriteBorderIcon />
              {/* <FavoriteBorderIcon onClick={handleOnWishlistAdd} /> */}
            </a>
            <a href="">
<<<<<<< HEAD
              <ShoppingCartOutlined onClick={props.addToCart} />
=======
              <AddShoppingCartIcon />
>>>>>>> d5e401218d4e17c8f81d3abd48ebeb1865b67a7a
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
