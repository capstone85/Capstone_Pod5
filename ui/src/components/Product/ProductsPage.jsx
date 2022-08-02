import * as React from "react";
import "./ProductsPage.css";
import ProductGrid from "./ProductGrid";
import SearchBar from "./ProductSearch";
import Selector from "./Filter";
import Navbar from "../Navbar/Navbar";
import { Card } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { sizing } from "@mui/system";
import Footer from "../Footer/Footer";

// Renders header, searchbar, and product grid
export default function ProductsPage(props) {
    // useEffect(async () => {
    //     try {
    //       const response = await axios.get("http://localhost:5174/product/products");
    //       setIsFetching(false);
    //       if (response.statusText != "OK") {
    //         setError(response.statusText);
    //       } else if (response.data.orders.length == 0) {
    //         setError("Did not find any orders");
    //       } else {
    //         setOrders(response.data.orders);
    //       }
    //     } catch (err) {
    //       setError(err);
    //     }
    //   }, []);

  return (
    <>
      <Card sx={({ maxHeight: "100px" }, { maxWidth: "35%" })} className="hero">
        <CardMedia
          component="img"
          height="200"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1024px-H%26M-Logo.svg.png"
          alt={props.name}
        />
      </Card>
      <div className="side-container">
        <SearchBar
          handleOnSearchbarChange={props.handleOnSearchbarChange}
          setSearchBar={props.setSearchbar}
          products={props.products}
        />

        <ul className="categories">
          {props.categories.map((category, idx) => (
            <Selector
              key={idx}
              label={category}
              isActive={props.selectedCategory == category}
              onClick={() => {
                props.setActiveCategory(category);
              }}
            />
          ))}
        </ul>
      </div>
      <div className="product-grid-container">
        <ProductGrid
          products={props.products}
          handleAddItemToCart={props.handleAddItemToCart}
          handleRemoveItemFromCart={props.handleRemoveItemFromCart}
          shoppingCart={props.shoppingCart}
          setIsFetching={props.setIsFetching}
          searchbar={props.searchbar}
        />
      </div>
      <Footer />
    </>
  );
}
