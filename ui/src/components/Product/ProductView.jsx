/* * * * NOT USED * * * */

import "./ProductView.css";
import ProductCard from "./ProductCard";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import Footer from "../Footer/Footer";
//add to cart button and wishlist
import Button from "@mui/material/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Renders product card with product description
export default function ProductView() {
  let [product, setProduct] = useState(undefined);
  let [loading, setLoading] = useState(true);
  let productId = useParams();

  const [btnClassCart, setBtnClassCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    const setup = async () => {
      await getData();
    };
    setup();
  }, []);

  async function getData() {
    setLoading(true);
    const { data, error } = await apiClient.listProduct(productId);
    // console.log("data from apiclient ", data.product);
    setProduct(data.product);
  }

  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

  console.log(productId.productId);
  useEffect(() => {
    async function wishlist() {
      const a = await apiClient.checkIfInWishlist(productId.productId);
      setIsInWishlist(a.data.isInWishlist);
    }
    wishlist();
  }, []);

  if (!loading) {
    let name = product.name;
    let category = product.category;
    let image = product.image;
    let description = product.description;
    let price = product.price;
    let store_name = product.store_name;
    return (
      <>
        <div className="product-view-page">
          <div className="product-view-image-wrapper">
            <img className="product-view-image" src={image} alt={name} />
          </div>

          <div className="product-descriptions-wrapper">
            <button
              className="waitlistButton"
              onClick={async () => {
                const a = await apiClient.checkIfInWishlist(product.id);
                setIsInWishlist(a.data.isInWishlist);
                if (isInWishlist) {
                  setIsInWishlist(false);
                  apiClient.removeFromWishlist(product.id);
                } else {
                  setIsInWishlist(true);
                  apiClient.addToWishlist(product.id);
                }
              }}
            >
              {isInWishlist ? (
                <FavoriteIcon style={{ color: "#B86B77" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </button>
            <h2 className="name">{name}</h2>

            <h3 className="price" style={{ color: "#B86B77" }}>
              ${price}
            </h3>

            <p className="storeName" style={{ color: "gray" }}>
              <b style={{ color: "black" }}>Style from </b>
              <button
                onClick={() => {
                  navigate("/store-page/" + product.store_id);
                }}
              >
                {" "}
                {store_name}
              </button>
            </p>

            <p className="Product-Description">{description}</p>

            <div className="addToCartButton">
              <Button
                variant="text"
                onClick={async () => {
                  const a = await apiClient.checkIfInCart(product.id);
                  const isInCart = a.data.isInShoppingCart;
                  if (isInCart) {
                    apiClient.incrementProductQuantity(product.id);
                  } else {
                    apiClient.addToShoppingCart(product.id);
                  }
                  setBtnClassCart(true);
                }}
                style={{ color: "#B86B77" }}
              >
                Add to Cart
              </Button>
            </div>
            <div className="category" style={{ color: "gray" }}>
              <p>
                <b style={{ color: "black" }}>Categories: </b> {category}
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
