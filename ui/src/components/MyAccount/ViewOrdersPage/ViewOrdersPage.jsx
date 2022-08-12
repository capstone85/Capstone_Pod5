import * as React from "react";
import "./ViewOrdersPage.css";
import DashboardLinks from "../DashboardLinks/DashboardLinks";
import Footer from "../../Footer/Footer";
import { useState } from "react";
import { useEffect } from "react";
import apiClient from "../../../services/apiClient";

export default function ViewOrdersPage(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  

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
  return (
    <div className="Orders">
      {/* <DashboardLinks
        handleLogout={props.handleLogout}
        isLogin={props.isLogin}
        user={props.user}
        setUser={props.setUser}
      /> */}
      <div className="header">
        <h1>MY ORDERS</h1>
      </div>
      <hr style={{ transform: "translateY(60px) ", width: "1530px" }}></hr>

      <div class="container py-5">
        <div class="row">
          <div class="col-lg-7 mx-auto">
            <div class="card rounded-0 border-0 shadow">
              <div class="card-body p-5">
                {/* <!--  Bootstrap table--> */}
                <div class="table-responsive">
                  <table class="table">
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
                      {product.map((item) => {
                        
                        return (
                          <tr>
                            <th scope="row">{item.order_id}</th>
                            <td>{item.created_at}</td>
                            <td>{item.status}</td>
                            <td>${item.price}</td>
                            <td>VIEW ORDER</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
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
