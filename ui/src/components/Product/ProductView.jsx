import "./ProductView.css";
import ProductCard from "./ProductCard";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";

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
    return (
      <div className="container">
        <img class="product-image" src={image} alt="" />
        <h1 className="name">{name}</h1>
        <h2 className="category">{category}</h2>
        <p className="description">{description}</p>
        <p className="price">${price}</p>
      </div>
    );
  }
}
