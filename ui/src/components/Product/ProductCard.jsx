import * as React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

// Renders image, name, price, and quantity of products.
// Buttons allow users to change quantity of products.
export default function ProductCard(props) {
  console.log("hello product card");
  console.log(props.product.name);
  return (
    <div className="product-card">
      <h1 className="product-name">product: {props.product.name}</h1>

      <div className="buttons">
        <button
          className="remove"
          onClick={() => {
            props.handleRemoveItemFromCart(props.productId);
          }}
        >
          -
        </button>
        <button
          className="add"
          onClick={() => {
            props.handleAddItemToCart(props.productId);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

{
  /* <Link
          to={"/products/" + props.productId}
          onClick={() => props.setIsFetching(true)}
        > */
}
{
  /* <img
            className="product-image"
            src={props.image}
            alt={props.name}
          ></img> */
}
{
  /* </Link> */
}

{
  /* {props.quantity > 0 ? (
          <p className="quantity">{props.quantity}</p>
        ) : null} */
}

{
  /* 
      <div className="item-description">
        {props.showDescription ? (
          <>
            <p>{props.description}</p>
          </>
        ) : null}
      </div> */
}
{
  /* <p className="product-price">${props.price.toFixed(2)}</p> */
}
