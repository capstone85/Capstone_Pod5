import * as React from "react";
import "./ViewOrdersPage.css";
import DashboardLinks from "../DashboardLinks/DashboardLinks";
import Footer from "../../Footer/Footer";
import { useState } from "react";
import { useEffect } from "react";
import apiClient from "../../../services/apiClient";
import { useNavigate } from "react-router-dom";

export default function ViewOrdersPage(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  

  let navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      if (!(Object.keys(props.user).length === 0)) {
        setIsFetching(true);
        const { data, error } = await apiClient.listCheckoutByUserId(
          props.user.id
        );
        if (error) {
          setError(error);
        }
        if (data) {
          console.log("data", data);
          console.log("This is data.products" + data.orders);
          setProduct(data.orders);
        }
        setIsFetching(false);
      }
    };

    fetchProducts();
  }, [props.user]);

  console.log(product);
  return (
    <div className="Orders">
      <div className="view-orders-header">
        <h1>MY ORDERS</h1>
        <hr style={{ transform: "translateY(55px) ", width: "1530px" }}></hr>
      </div>

      <div className="my-orders-table">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ORDER NUMBER</th>
              <th scope="col">DATE</th>
              <th scope="col">STATUS</th>
              <th scope="col">TOTAL</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {product.map((item, idx) => {
              return (
                <tr key={idx}>
                  <th scope="row">#{item.order_id}</th>
                  <td>{item.created_at}</td>
                  <td>{item.status}</td>
                  <td>${item.price}</td>
                  <td
                    onClick={() => navigate("/confirmation/" + item.order_id)}
                    style={{ color: "#B86B77" }}
                  >
                    VIEW ORDER
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
}

{
  /* <div classNamne="orders-container">
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">ORDER NUMBER</div>
            <div className="col col-2">DATE</div>
            <div className="col col-3">STATUS</div>
            <div className="col col-4">TOTAL</div>
            <div className="col col-5">ACTIONS</div>
          </li>

          {product.map((item) => {
            return (
              <li className="table-row">
                <div className="col col-1" data-label="order number">
                  {item.order_id}
                </div>
                <div className="col col-2" data-label="date">
                  {item.created_at}
                </div>
                <div className="col col-3" data-label="status">
                  {item.status}
                </div>
                <div className="col col-4" data-label="total">
                  $
                </div>
                <div className="col col-5" data-label="actions">
                  VIEW ORDER
                </div>
              </li>
            );
          })}
        </ul>
        </div> */
}
