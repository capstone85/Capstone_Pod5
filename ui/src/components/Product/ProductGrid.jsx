import * as React from "react";
import "./ProductGrid.css";
import ProductCard from "./ProductCard";

// Iterates over all products and displays their respective product card
export default function ProductGrid(props) {
  let foundSearch = false;

  return (
    <>
      <div className="product-grid">
        {props.product.map((item, idx) => {
          if (
            item.name.toLowerCase().includes(props.searchbar.toLowerCase()) ||
            item.category.toLowerCase().includes(props.searchbar.toLowerCase())
          ) {
            foundSearch = true;
            return (
              <div key={idx}>
                <ProductCard
                  key={item.id}
                  addToCart={props.handleAddItemToCart}
                  handleRemoveItemFromCart={props.handleRemoveItemFromCart}
                  setIsFetching={props.setIsFetching}
                  product={item}
                />
              </div>
            );
          }
        })}
      </div>
      {!foundSearch ? (
        <div className="none-found">
          <h1>No related products available.</h1>
        </div>
      ) : null}
    </>
  );
}
