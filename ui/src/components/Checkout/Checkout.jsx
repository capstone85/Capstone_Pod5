import "./Checkout.css";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";
import Confirmation from "../Confirmation/Confirmation";
import Footer from "../Footer/Footer";

//delivery details input forms
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Checkout(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState([]);
  const [confirmation, setConfirmation] = useState([]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  //checkout form
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    zipCode: "",
    city: "",
    phoneNumber: "",
    emailAddress: "",
    orderNotes: "",
  });

  //total prices calculations------------
  let subtotal = 0;
  let deliveryFee = 10;
  let taxRate = 1.08;

  function getTotal(subtotal, taxRate, deliveryFee) {
    return subtotal * taxRate + deliveryFee;
  }
  //-------------------------------------

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

  //different confirmation Number given to an order after checkout
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
        {/* delivery details portion of the checkout page */}
        <div className="delivery-details">
          <h2>Delivery Details</h2>
          <div className="checkout-input-fields">
            <div className="checkout-input-first/lastName">
              <Box
                style={{ transform: "translateX(-10px)" }}
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                {/* first name input  */}
                <TextField
                  id="standard-basic"
                  label="First Name *"
                  variant="standard"
                  type="firstName"
                  name="firstName"
                  placeholder="Jane"
                />
                {/* last name input */}
                <TextField
                  id="standard-basic"
                  label="Last Name *"
                  variant="standard"
                  type="lastName"
                  name="lastName"
                  placeholder="Doe"
                />
              </Box>
            </div>
            {/* company name input field (optional) */}
            <div className="checkout-input-fields">
              <TextField
                style={{ width: "460px", height: "60px" }}
                id="standard-basic"
                label="Company Name"
                variant="standard"
                type="companyName"
                name="companyName"
                placeholder="Company Name"
              />
            </div>

            {/* Street Address input field */}
            <div className="checkout-input-fields">
              <TextField
                style={{ width: "460px", height: "60px" }}
                id="standard-basic"
                label="Street Address *"
                variant="standard"
                type="streetAddress"
                name="streetAddress"
                placeholder="Street Address"
              />
            </div>

            {/* ZIP code input form */}
            <div className="checkout-input-fields">
              <TextField
                style={{ width: "460px", height: "60px" }}
                id="standard-basic"
                label="ZIP Code *"
                variant="standard"
                type="zipCode"
                name="zipCode"
                placeholder="ZIP Code"
              />
            </div>

            {/* city input form */}
            <div className="checkout-input-fields">
              <TextField
                style={{ width: "460px", height: "60px" }}
                id="standard-basic"
                label="City *"
                variant="standard"
                type="city"
                name="city"
                placeholder="City"
              />
            </div>

            {/* phone number input form */}
            <div className="checkout-input-fields">
              <TextField
                style={{ width: "460px", height: "60px" }}
                id="standard-basic"
                label="Phone Number *"
                variant="standard"
                type="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
              />
            </div>

            {/* email address input form */}
            <div className="checkout-input-fields">
              <TextField
                style={{ width: "460px", height: "60px" }}
                id="standard-basic"
                label="Email Address *"
                variant="standard"
                type="emailAddress"
                name="emailAddress"
                placeholder="Email Address"
              />
            </div>

            {/* order notes input form  */}
            <div className="order-notes">
              <TextField
                style={{ width: "460px", height: "60px" }}
                id="standard-basic"
                label="Order Notes "
                variant="standard"
                type="orderNotes"
                name="orderNotes"
                placeholder="Order Notes"
              />
            </div>
          </div>
        </div>
        {/* {product.map((item, idx) => {
          return (
            <div className="product-orders" key={idx}>
              <p>{item.product_name}</p>
              <div
                className="item-product-price"
                style={{ transform: "translateX(500px)" }}
              >
                <p>${item.product_price}</p>
              </div>
            </div>
          );
        })} */}

        {/* ------------------------------------------------------------- */}
        {/* your order portion of the page */}
        <div className="your-order">
          {/* your order information */}
          <h2
            style={{
              margin: "10px",
              transform: "translateX(190px) translateY(-20px)",
            }}
          >
            Your Order
          </h2>

          {/* order summary section */}
          <div className="checkout-order-summary">
            <div className="order-header">
              <p>PRODUCT</p>
              <div className="total-header">
                <p>TOTAL</p>
              </div>
              <hr
                style={{
                  width: "550px",
                  transform: "translateY(-30px) translateX(4px)",
                }}
              ></hr>
            </div>
            {product.map((item) => {
              subtotal += item.product_price;
              return (
                <div className="product-orders">
                  <p
                    style={{
                      transform: "translateY(-5px)",
                      lineHeight: "0.1",
                      color: "gray",
                    }}
                  >
                    {item.product_name}
                  </p>
                  <div
                    className="item-product-price"
                    style={{
                      transform: "translateX(500px) translateY(-30px)",
                      color: "gray",
                    }}
                  >
                    <p>${item.product_price}</p>
                  </div>
                </div>
              );
            })}
            <hr
              style={{
                width: "555px",
                transform: "translateY(-10px) translateX(0px)",
              }}
            ></hr>
            {/* prices section of the order summary - subtotal, tax, and total will be shown (styling was added to this) */}
            <div className="price-totals">
              <tr>
                <td>SUBTOTAL </td>
                <td style={{ transform: "translateX(428px)", color: "gray" }}>
                  ${subtotal}
                </td>
              </tr>
              <hr
                style={{
                  width: "555px",
                  transform: "translateY(5px) translateX(0px)",
                }}
              ></hr>
              <tr style={{ transform: "translateY(14px)" }}>
                <td>DELIVERY</td>
                <td style={{ transform: "translateX(435px)", color: "gray" }}>
                  ${deliveryFee}
                </td>
              </tr>
              <hr
                style={{
                  width: "555px",
                  transform: "translateY(20px) translateX(0px)",
                }}
              ></hr>
              <tr style={{ transform: "translateY(28px)" }}>
                <td>TAX (8%)</td>
                <td style={{ transform: "translateX(440px)", color: "gray" }}>
                  ${(subtotal * 0.08).toFixed(2)}
                </td>
              </tr>
              <hr
                style={{
                  width: "555px",
                  transform: "translateY(35px) translateX(0px)",
                }}
              ></hr>
              <tr style={{ transform: "translateY(45px) translateX(3px)" }}>
                <b>TOTAL</b>
                <td style={{ transform: "translateX(455px)" }}>
                  ${getTotal(subtotal, taxRate, deliveryFee).toFixed(2)}
                </td>
              </tr>

              {/* delivery time section - users will be able to schedule a delivery time */}
              <div
                className="delivery-time-schedule"
                style={{ transform: "translateY(70px)" }}
              >
                <tr>
                  <td>SCHEDULE DELIVERY TIME</td>
                </tr>
              </div>
              <button
                className="checkout-btn"
                onClick={() => {
                  checkoutProducts();
                  apiClient.deleteShoppingCart(props.user.id);
                  navigate("/confirmation/" + confirmationNum);
                }}
                style={{ transform: "translateY(100px) translateX(80px)" }}
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
