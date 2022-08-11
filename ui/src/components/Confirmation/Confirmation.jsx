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
        <h2>Order Details</h2>
        {/* order number and delivery time fram sections  */}
        <div className="orderDetails-info">
          <tr>
            <tr>
              <td>ORDER NUMBER </td>
              <td>DELIVERY TIME FRAME</td>
            </tr>
            <tr>
              <td>{confirmation}</td>
              <td>time(this will change)</td>
            </tr>
          </tr>

          <tr>
            <tr>
              <td>EMAIL </td>
              <td>some email</td>
            </tr>
            <tr>
              <td>DELIVERY ADDRESS</td>
              <td>some address</td>
            </tr>
          </tr>

          <tr>
            <tr>
              <td>PAYMENT METHOD </td>
              <td>some payment method</td>
            </tr>
          </tr>

          <tr>
            <tr>
              <td>ORDER DATE </td>
              <td>a date</td>
            </tr>
            <tr>
              <td>CONTACT NUMBER</td>
              <td>some number</td>
            </tr>
          </tr>
        </div>

        <div className="order-summary"></div>

        {product.map((item) => {
          return (
            <div className="product-orders">
              <p>{item.product_name}</p>
              <p>{item.product_price}</p>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}
