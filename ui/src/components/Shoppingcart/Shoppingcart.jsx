import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { formatPrice } from "../../utils/format";
import {
  calculateItemSubtotal,
  calculateTaxesAndFees,
  calculateTotal,
} from "../../utils/calculations";
import "./ShoppingCart.css";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import CartItem from "./CartItem.jsx";

export default function ShoppingCart(props) {
  //fetch data from shopping cart table
  const [isFetching, setIsFetching] = useState(false);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);

  let subtotal = 0;
  let deliveryFee = 10;
  let taxRate = 1.08;

  function getTotal(subtotal, taxRate, deliveryFee) {
    return subtotal * taxRate + deliveryFee;
  }

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!(Object.keys(props.user).length === 0)) {
        setIsFetching(true);

        const { data, error } = await apiClient.listAllShoppingCart(
          props.user.id
        );
        if (error) {
          setError(error);
        }
        if (data) {
          // console.log("data", data);
          // console.log("This is data.products" + data.products);
          setProduct(data.products);
        }
        setIsFetching(false);
      }
    };

    fetchProducts();
  }, [props.user]);

  return (
    <>
      <div className="cart-banner">
        <h1>CART</h1>
      </div>
      <hr style={{ transform: "translateY(60px)", width: "1530px" }}></hr>
      <div className="cart-page">
        <div className="shopping-cart">
          {product[0] == null ? (
            <div className="empty-cart-message">
              Nothing in your cart yet.{" "}
              <button
                onClick={() => {
                  navigate("/store-page");
                }}
              >
                Start shopping now!
              </button>
            </div>
          ) : null}
          {product.map((item, idx) => {
            subtotal += item.product_price;
            return <CartItem item={item} key={idx} />;
            // console.log(item.product_image);
            // query: if product in cart, check if its in the wishlist.
            // if product is in BOTH, then make heart red
          })}
        </div>
        <div className="shopping-cart-totals">
          <h1>Totals</h1>
          <table className="labels">
            <tbody>
              <tr>
                <td className="subtotal">SUBTOTAL</td>
                <td>${subtotal}</td>
              </tr>
              <tr>
                <td className="delivery">DELIVERY FEE</td>
                <td>${deliveryFee}</td>
              </tr>
              <tr>
                <td className="subtotal">TAX (8%)</td>
                <td>${(subtotal * 0.08).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <hr className="checkout-hr"></hr>
          <div className="total">
            <span className="total-label">TOTAL</span>
            {product.length === 0 ? (
              <span className="total-price">$0</span>
            ) : (
              <span className="total-price">
                ${getTotal(subtotal, taxRate, deliveryFee).toFixed(2)}
              </span>
            )}
          </div>
          <div className="checkout-btn-wrapper">
            {product.length === 0 ? null : (
              <button
                className="checkout-btn"
                onClick={() => {
                  navigate("/checkout");
                }}
              >
                PROCEED TO CHECKOUT
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
