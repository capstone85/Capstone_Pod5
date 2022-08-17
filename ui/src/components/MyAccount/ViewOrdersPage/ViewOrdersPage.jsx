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
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {product.map((item, idx) => {
              var next = product[idx + 1];
              if (next != null) {
                console.log("Next product", next.order_id);
                if (item.order_id == next.order_id) {
                  return null;
                } else {
                  var t = item.created_at.split(/[- : T]/);
                  console.log(t);
                  var d = t[1] + "-" + t[2] + "-" + t[0];
                  return (
                    <tr key={idx}>
                      <th scope="row">#{item.order_id}</th>
                      <td>{d}</td>
                      <td>{item.status}</td>
                      <td
                        onClick={() =>
                          navigate("/confirmation/" + item.order_id)
                        }
                        style={{ color: "#B86B77" }}
                      >
                        VIEW ORDER
                      </td>
                    </tr>
                  );
                }
              } else {
                var t = item.created_at.split(/[- : T]/);
                console.log(t);
                var d = t[1] + "-" + t[2] + "-" + t[0];
                return (
                  <tr key={idx}>
                    <th scope="row">#{item.order_id}</th>
                    <td>{d}</td>
                    <td>{item.status}</td>
                    <td
                      onClick={() => navigate("/confirmation/" + item.order_id)}
                      style={{ color: "#B86B77" }}
                    >
                      VIEW ORDER
                    </td>
                  </tr>
                );
              }

              // return (
              //   <tr key={idx}>
              //     <th scope="row">#{item.order_id}</th>
              //     <td>{item.created_at}</td>
              //     <td>{item.status}</td>
              //     <td
              //       onClick={() => navigate("/confirmation/" + item.order_id)}
              //       style={{ color: "#B86B77" }}
              //     >
              //       VIEW ORDER
              //     </td>
              //   </tr>
              // );
            })}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
}
