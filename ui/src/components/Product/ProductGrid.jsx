import * as React from "react";
import "./ProductGrid.css";
import ProductCard from "./ProductCard";

// Iterates over all products and displays their respective product card
export default function ProductGrid(props) {
  let foundSearch = false;
  //popup functions for the products
  // function on() {
  //   document.getElementById("overlay").style.display = "block";
  // }

  // function off() {
  //   document.getElementById("overlay").style.display = "none";
  // }
  return (
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
                // category={item.category}
                // description={item.description}
                // showDescription={false}
                // image={item.image}
                // name={item.name}
                // price={item.price}
                // storeId={curr.id}
                // products={props.products}
                // quantity={quantity}
                addToCart={props.handleAddItemToCart}
                handleRemoveItemFromCart={props.handleRemoveItemFromCart}
                setIsFetching={props.setIsFetching}
                product={item}
              />
              {/* <h2>Overlay with Text</h2>
              <button onClick={on}>
                Turn on overlay effect
                {console.log("Name: ", item.name)}
              </button>
              <div id="overlay" onClick={off}>
                <div className="text">
                  <h2
                    style={{
                      transform: "translateX(250px) translateY(30px)",
                    }}
                  >
                    {item.name}
                  </h2>
                  <img src={item.image}></img>
                  <div
                    className="overlay-price"
                    style={{
                      transform: "translateY(-220px) translateX(245px)",
                    }}
                  >
                    ${item.price}
                  </div>
                  <p>{item.description}</p>
                </div>
              </div> */}
            </>
          );
        }
      })}
      {!foundSearch ? (
        <div className="none-found">
          <h1>No products available.</h1>
        </div>
      ) : null}
    </div>
  );
}
