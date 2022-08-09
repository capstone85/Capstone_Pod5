import "./Checkout.css";
import { useState } from "react";
import { useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";
import Confirmation from "../Confirmation/Confirmation";

export default function Checkout(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState([]);
  const [confirmation, setConfirmation] = useState([]);
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

  var confirmationNum = Math.ceil(Math.random() * 100000);

  const checkoutProducts = async () => {
    product.map((item) => {
      console.log("ITEM", item);
      apiClient.addToCheckout(confirmationNum, item.product_id);
    });
  };

  return (
    <>
      <div className="checkout-banner">
        <h1>CHECKOUT</h1>
      </div>
      <div className="checkout">
        <div className="delivery-details">{/* delivery forms */}</div>
        <div className="your-order">
          {/* your order information */}
          <h2 style={{ margin: "10px", transform: "translateX(-10px)" }}>
            Your Order
          </h2>
          <div className="order-header">
            <p>PRODUCT</p>
            <p>TOTAL</p>
          </div>
          {product.map((item) => {
            return (
              <div className="product-orders">
                <p>{item.product_name}</p>
                <p>${item.product_price}</p>
              </div>
            );
          })}

          <button
            className="checkout-btn"
            onClick={() => {
              checkoutProducts();
              navigate("/confirmation/" + confirmationNum);
            }}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </>
  );
}
