import "./Confirmation.css";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import { BrowserRouter } from "react-router-dom";
import { useParams } from "react-router-dom";

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



  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       if (!(Object.keys(props.user).length === 0)) {
  //         setIsFetching(true);
  //         const { data, error } = await apiClient.listCheckoutByOrderId(
  //           confirmation
  //         );
  //         if (error) {
  //           setError(error);
  //         }
  //         if (data) {
  //           // console.log("data", data);
  //           // console.log("This is data.products" + data.products);
  //           setProduct(data.products);
  //         }
  //         setIsFetching(false);
  //       }
  //     };

  //     fetchProducts();
  //   }, [props.user]);

  return (
    <>
      <div className="order-details">
        <h2>Order Details</h2>
        {/* {product.map((item) => {
          apiClient.addToCheckout(confirmation, item.product_id);
          return (
            <div className="product-orders">
              <p>{item.product_name}</p>
              <p>{item.product_price}</p>
            </div>
          );
        })} */}
        <p>Confirmation Number: {confirmation}</p>
      </div>
    </>
  );
}
