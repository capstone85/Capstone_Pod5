import "./Confirmation.css";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import { BrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function Confirmation(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);

  //total prices calculations------------
  let subtotal = 0;
  let deliveryFee = 10;
  let taxRate = 1.08;

  function getTotal(subtotal, taxRate, deliveryFee) {
    return subtotal * taxRate + deliveryFee;
  }
  //-------------------------------------

  //   const confirmation = Math.ceil(Math.random() * 10000);
  let { confirmation } = useParams();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!(Object.keys(props.user).length === 0)) {
        setIsFetching(true);
        const { data, error } = await apiClient.listCheckoutByOrderId(
          confirmation
        );
        if (error) {
          setError(error);
        }
        if (data) {
          console.log("data", data);
          console.log("This is data.products" + data.products);
          setProduct(data.products);
        }
        setIsFetching(false);
      }
    };

    fetchProducts();
  }, [props.user]);

  return (
    <div className="confirmation">
      <div className="confirmation-header">
        <h1>Order Confirmation</h1>
      </div>
      <div className="order-confirmation">
        <h2>&#10004; We've received your order</h2>
      </div>

      {/* order details section */}
      <div className="order-details">
        <h2 style={{ padding: "10px", transform: "translateX(-15px)" }}>
          Order Details
        </h2>
        {/* order number and delivery time fram sections  */}
        <div className="orderDetails-info">
          <tr>
            <tr>
              <b>ORDER NUMBER </b>
              <td style={{ transform: "translateX(250px)" }}>
                <b>DELIVERY TIME FRAME</b>
              </td>
            </tr>
            <tr>
              <td style={{ color: "gray" }}>{confirmation}</td>
              <td style={{ transform: "translateX(250px)", color: "gray" }}>
                time(this will change)
              </td>
            </tr>
          </tr>

          <tr style={{ transform: "translateY(40px)" }}>
            <tr>
              <b>EMAIL </b>
              <td style={{ transform: "translateX(288px)" }}>
                <b>DELIVERY ADDRESS</b>
              </td>
            </tr>
            <tr>
              <td style={{ color: "gray" }}>some email</td>
              <td style={{ transform: "translateX(288px)", color: "gray" }}>
                some address
              </td>
            </tr>
          </tr>

          <tr style={{ transform: "translateY(80px)" }}>
            <tr>
              <b>PAYMENT METHOD </b>
            </tr>
            <tr>
              <td style={{ color: "gray" }}>some payment method</td>
            </tr>
          </tr>

          <tr style={{ transform: "translateY(120px)" }}>
            <tr>
              <b>ORDER DATE </b>
              <td style={{ transform: "translateX(275px)" }}>
                <b>CONTACT NUMBER</b>
              </td>
            </tr>
            <tr>
              <td style={{ color: "gray" }}>a date</td>
              <td style={{ transform: "translateX(275px)", color: "gray" }}>
                some number
              </td>
            </tr>
          </tr>
        </div>

        {/* order summary portion --> should show all the products purchased */}
        <div className="order-summary">
          <h2
            style={{
              transform: "translateX(93vh) translateY(-210px)",
              padding: "10px",
            }}
          >
            Order Summary
          </h2>
          <div className="order-summary-body">
            {/* order summary section */}
            <div className="checkout-order-summary">
              <div className="order-header">
                <p>PRODUCT</p>
                <div className="total-header">
                  <p
                    style={{ transform: "translateY(-33px) translateX(475px)" }}
                  >
                    TOTAL
                  </p>
                </div>
                <hr
                  style={{
                    width: "555px",
                    transform: "translateY(-30px) translateX(0px)",
                  }}
                ></hr>
              </div>
              {/* showing each product on the shopping cart that was purchased  */}
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
                    <p
                      style={{
                        transform: "translateX(490px) translateY(-30px)",
                        color: "gray",
                      }}
                    >
                      ${item.product_price}
                    </p>
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
                  <td style={{ transform: "translateX(415px)", color: "gray" }}>
                    ${subtotal}
                  </td>
                </tr>
                <hr
                  style={{
                    width: "555px",
                    transform: "translateY(5px) translateX(0px)",
                  }}
                ></hr>
              </div>
              <tr style={{ transform: "translateY(14px)" }}>
                <td>DELIVERY</td>
                <td style={{ transform: "translateX(420px)", color: "gray" }}>
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
                <td style={{ transform: "translateX(425px)", color: "gray" }}>
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
                <td style={{ transform: "translateX(438px)" }}>
                  ${getTotal(subtotal, taxRate, deliveryFee).toFixed(2)}
                </td>
              </tr>
            </div>
          </div>
        </div>

        {/* {product.map((item) => {
          return (
            <div className="product-orders">
              <p>{item.product_name}</p>
              <p>{item.product_price}</p>
            </div>
          );
        })} */}
      </div>
      <Footer />
    </div>
  );
}
