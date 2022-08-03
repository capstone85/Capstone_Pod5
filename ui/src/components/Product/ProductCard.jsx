import * as React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Renders image, name, price, and quantity of products.
// Buttons allow users to change quantity of products.
export default function ProductCard(props) {
  console.log("hello product card");
  // console.log(props.product.name);
  return (
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
    <>
      <div class="product-card">
        <div class="product-tumb">
          <img
            src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F51%2F17%2F5117a2d52d6332f96afe56b30c2628905d0fbe68.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_dresses_longsleevedress%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D"
            alt=""
          />
        </div>
        <div class="product-details">
          <span class="product-category">Categories</span>
          <h4>
            <a href="">Name</a>
          </h4>
          <p>Description</p>
          <div class="product-bottom-details">
            <div class="product-price">$23.99</div>
            <div class="product-links">
              <a href="">
                <FavoriteBorderIcon />
                {/* <FavoriteBorderIcon onClick={handleOnWishlistAdd} /> */}
              </a>
              <a href="">
                <ShoppingCartOutlined />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
