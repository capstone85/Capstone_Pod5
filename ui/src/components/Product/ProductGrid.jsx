import * as React from "react";
import "./ProductGrid.css";
import ProductCard from "./ProductCard";

// Iterates over all products and displays their respective product card
export default function ProductGrid(props) {
  let foundSearch = false;
  console.log("hi");
  return (
    <div className="product-grid">
      {props.product.map((item, idx) => {
        if (item.name.toLowerCase().includes(props.searchbar.toLowerCase())) {
          foundSearch = true;
          return (
            <ProductCard
              key={idx}
              category={item.category}
              description={item.description}
              // showDescription={false}
              image={item.image}
              name={item.name}
              price={item.price}
              // storeId={curr.id}
              // products={props.products}
              // quantity={quantity}
              handleAddItemToCart={props.handleAddItemToCart}
              handleRemoveItemFromCart={props.handleRemoveItemFromCart}
              setIsFetching={props.setIsFetching}
              product={item}
            />
          );
        }
      })}
      {!foundSearch ? (
        <div className="none-found">
          <h1>No products available.</h1>
        </div>
      ) : null}
    </div>

    // <>
    //   <div className="product-grid">
    //     {props.products.map((currProduct, idx) => {
    //       let quantity = 0;
    //       if (typeof props.shoppingCart != "undefined") {
    //         let currItem = props.shoppingCart.find(
    //           (cart) => cart["itemId"] === currProduct.id
    //         );
    //         if (typeof currItem != "undefined") {
    //           quantity = currItem["quantity"];
    //         }
    //       }

    // if (
    //   currProduct.name
    //     .toLowerCase()
    //     .includes(props.searchbar.toLowerCase())
    // ) {
    //   foundSearch = true;
    //   console.log("hi" + props.product);
    //   return (
    //     <ProductCard
    //       key={idx}
    //       category={currProduct.category}
    //       description={currProduct.description}
    //       showDescription={false}
    //       image={currProduct.image}
    //       name={currProduct.name}
    //       price={currProduct.price}
    //       storeId={curr.id}
    //       products={props.products}
    //       quantity={quantity}
    //       handleAddItemToCart={props.handleAddItemToCart}
    //       handleRemoveItemFromCart={props.handleRemoveItemFromCart}
    //       setIsFetching={props.setIsFetching}
    //       product={props.product}
    //     />
    //   );
    // }
    //     })}
    //     <div className="none-found">
    //       {!foundSearch ? <h1>No products available.</h1> : null}
    //     </div>
    //   </div>
    // </>
  );
}
