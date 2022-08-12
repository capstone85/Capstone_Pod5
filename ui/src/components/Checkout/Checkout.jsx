import "./Checkout.css";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom";
import Confirmation from "../Confirmation/Confirmation";

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
  const [isLoading, setIsLoading] = useState(false);

  //checkout form
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    address: "",
    zipcode: "",
    city: "",
    number: "",
    email: "",
  });

  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

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

  const handleOnSubmit = async (s) => {
    console.log("Inside handle on submit");
    console.log(form);
    apiClient.addDeliveryDetails(form, confirmationNum);
    if (error) {
      setErrors(error);
    }
    setIsLoading(false);
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
                  type="first_name"
                  name="first_name"
                  placeholder="Jane"
                  value={form.first_name}
                  onChange={handleOnInputChange}
                />
                {/* last name input */}
                <TextField
                  id="standard-basic"
                  label="Last Name *"
                  variant="standard"
                  type="last_name"
                  name="last_name"
                  placeholder="Doe"
                  value={form.last_name}
                  onChange={handleOnInputChange}
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
                type="address"
                name="address"
                placeholder="address"
                value={form.address}
                onChange={handleOnInputChange}
              />
            </div>

            {/* ZIP code input form */}
            <div className="checkout-input-fields">
              <TextField
                style={{ width: "460px", height: "60px" }}
                id="standard-basic"
                label="ZIP Code *"
                variant="standard"
                type="zipcode"
                name="zipcode"
                placeholder="ZIP Code"
                value={form.zipcode}
                onChange={handleOnInputChange}
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
                value={form.city}
                onChange={handleOnInputChange}
              />
            </div>

            {/* phone number input form */}
            <div className="checkout-input-fields">
              <TextField
                style={{ width: "460px", height: "60px" }}
                id="standard-basic"
                label="Phone Number *"
                variant="standard"
                type="number"
                name="number"
                placeholder="Phone Number"
                value={form.number}
                onChange={handleOnInputChange}
              />
            </div>

            {/* email address input form */}
            <div className="checkout-input-fields">
              <TextField
                style={{ width: "460px", height: "60px" }}
                id="standard-basic"
                label="Email Address *"
                variant="standard"
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleOnInputChange}
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
                  handleOnSubmit();
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
    </>
  );
}
