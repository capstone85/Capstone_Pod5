import * as React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import apiClient from "../../services/apiClient";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Navigate, useNavigate } from "react-router-dom";

export default function VendorProductCard(props) {
  let navigate = useNavigate();

  return (
    <div className="product-card">
      <div className="product-tumb">
        <img src={props.product.image} alt={props.product.name} />
       
      </div>
      <div className="product-details">
        <span className="product-category">{props.product.category}</span>
        <h4>
          <a
            href="#"
            onClick={() => {
              navigate("/products/" + props.product.id);
            }}
          >
            {props.product.name}
          </a>
        </h4>
        <div className="product-bottom-details">
          <div className="product-price">${props.product.price}</div>
        </div>
      </div>
    </div>
  );
}
