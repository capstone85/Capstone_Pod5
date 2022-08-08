/* * * * NOT USED * * * */

import "./ProductView.css";
import ProductCard from "./ProductCard";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";

//add to cart button and wishlist

import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Renders product card with product description
export default function ProductView() {
  let [product, setProduct] = useState(undefined);
  let [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  let productId = useParams();

  useEffect(() => {
    const setup = async () => {
      await getData();
    };
    setup();
  }, []);

  async function getData() {
    setLoading(true);
    const { data, error } = await apiClient.listProduct(productId);
    console.log("data from apiclient ", data.product);
    setProduct(data.product);
  }

  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

  if (!loading) {
    let name = product.name;
    let category = product.category;
    let image = product.image;
    let description = product.description;
    let price = product.price;
    let store_name = product.store_name;
    return (
      <div className="container">
        <li className="image">
          <img className="product-image" src={image} alt={name} />
        </li>

        <div className="productDescriptions">
          <h2 className="name">{name}</h2>

          <h3 className="price" style={{ color: "#B86B77" }}>
            ${price}
          </h3>

          <p className="storeName" style={{ color: "gray" }}>
            <b style={{ color: "black" }}>Style from </b> {store_name}
          </p>

          <p className="description">{description}</p>
        </div>

        <div className="addToCartButton">
          <Button
            variant="outlined"
            style={{ color: "#B86B77" }}
            onClick={() => apiClient.addToShoppingCart(product.id)}
          >
            Add to Cart
          </Button>
        </div>
        <div className="category" style={{ color: "gray" }}>
          <p>
            <b style={{ color: "black" }}>Categories: </b> {category}
          </p>
        </div>

        <div className="waitlistButton">
          <a href="">
            {/* <FavoriteBorderIcon /> */}
            <FavoriteBorderIcon
              onClick={() => apiClient.addToWishlist(props.product.id)}
            />
          </a>
        </div>
      </div>
    );
  }
}
