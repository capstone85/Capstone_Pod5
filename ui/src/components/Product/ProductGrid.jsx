import * as React from "react";
import "./ProductGrid.css";
import ProductCard from "./ProductCard";
import VendorProductCard from "./VendorProductCard";
import { useEffect } from "react";
// Iterates over all products and displays their respective product card
export default function ProductGrid(props) {
  let foundSearch = false;
  const isVendor = props.user?.category === "vendor";
  useEffect(() => {
    console.log("isvendor", isVendor);
    console.log("category", props.user);
  }, [isVendor]);

  return (
    <>
      <div className="product-grid">
        {props.product.map((item, idx) => {
          if (
            item.name.toLowerCase().includes(props.searchbar.toLowerCase()) ||
            item.category.toLowerCase().includes(props.searchbar.toLowerCase())
          ) {
            foundSearch = true;

            return isVendor ? (
              <div key={idx}>
                <p>{isVendor}</p>

                <VendorProductCard
                  key={item.id}
                  addToCart={props.handleAddItemToCart}
                  handleRemoveItemFromCart={props.handleRemoveItemFromCart}
                  setIsFetching={props.setIsFetching}
                  product={item}
                />
              </div>
            ) : (
              <ProductCard
                key={item.id}
                addToCart={props.handleAddItemToCart}
                handleRemoveItemFromCart={props.handleRemoveItemFromCart}
                setIsFetching={props.setIsFetching}
                product={item}
              />
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
