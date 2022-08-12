import * as React from "react";
import "./ProductsPage.css";
import ProductGrid from "./ProductGrid";
import SearchBar from "../Search/Searchbar";
import Selector from "./Filter";
import ShopperNavbar from "../Navbar/ShopperNavbar";
import { Card } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { sizing } from "@mui/system";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import ProductCard from "./ProductCard";
import axios from "axios";
import apiClient from "../../services/apiClient";

// Renders header, searchbar, and product grid
export default function ProductsPage(props) {
  const [product, setProduct] = useState([]);
  const [store, setStore] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [btnClassCart, setBtnClassCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const categories = ["All Categories", "clothing", "accessories", "footwear"];

  const currentItems = product.filter((item) => {
    return item.category == activeCategory;
  });

  let navigate = useNavigate();

  // console.log(activeCategory);
  // console.log(currentItems);
  // if (activeCategory != "All Categories") {
  //   setProduct(product);
  // }

  // Extract productId parameter from the url
  let { storeId } = useParams();
  useEffect(() => {
    // Makes axios get request to get individual product info
    async function getInfo() {
      props.setIsFetching(true);
      await axios
        .get(`http://localhost:5174/product/store/${storeId}`)
        .then((response) => {
          // console.log(response.data.product);
          setProduct(response.data.product);

          props.setIsFetching(false);
          //console.log("products:" + product);
        })
        .catch((error) => {
          <NotFound />;
        });
    }
    getInfo();
  }, []);

  useEffect(() => {
    async function wishlist() {
      if (product[0] != null) {
        const a = await apiClient.checkIfInWishlist(product.id);
        setIsInWishlist(a.data.isInWishlist);
      }
    }
    wishlist();
  }, []);

  useEffect(() => {
    // Makes axios get request to get individual product info
    async function getInfoStore() {
      props.setIsFetching(true);
      await axios
        .get(`http://localhost:5174/store/${storeId}`)
        .then((response) => {
          // console.log(response.data.store);
          setStore(response.data.store);
          props.setIsFetching(false);
        })
        .catch((error) => {
          <NotFound />;
        });
    }
    getInfoStore();
  }, []);

  return (
    <div className="products-page">
      <Card sx={({ maxHeight: "200px" }, { maxWidth: "35%" })} className="hero">
        <CardMedia
          component="img"
          height="auto"
          image={store.logo}
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
          {categories.map((category, idx) => (
            <Selector
              key={idx}
              category={category}
              isActive={activeCategory == category}
              onClick={() => {
                setActiveCategory(category);
              }}
            />
          ))}
        </ul>
      </div>
      <div className="product-grid-container">
        <ProductGrid
          handleAddItemToCart={props.handleAddItemToCart}
          handleRemoveItemFromCart={props.handleRemoveItemFromCart}
          shoppingCart={props.shoppingCart}
          setIsFetching={props.setIsFetching}
          searchbar={props.searchbar}
          store={props.store}
          product={activeCategory == "All Categories" ? product : currentItems}
          storeId={storeId}
        />
      </div>
      <Footer />
    </div>
  );
}
