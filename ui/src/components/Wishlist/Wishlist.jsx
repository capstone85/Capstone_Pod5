import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { formatPrice } from "../../utils/format";
import {
  calculateItemSubtotal,
  calculateTaxesAndFees,
  calculateTotal,
} from "../../utils/calculations";
import "./Wishlist.css";
import LoginPage from "../../../Login/LoginPage";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NotFound from "../NotFound/NotFound";
import ProductCard from "../Product/ProductCard";
import apiClient from "../../services/apiClient";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ClearIcon from "@mui/icons-material/Clear";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function Wishlist(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!(Object.keys(props.user).length === 0)) {
        setIsFetching(true);

        const { data, error } = await apiClient.listAllWishlist(props.user.id);
        if (error) {
          setError(error);
        }
        if (data) {
          setProduct(data.products);
          // window.localStorage.setItem(
          //   "Products",
          //   JSON.stringify(data.products)
          // );
        }
        setIsFetching(false);
      }
    };

    fetchProducts();
  }, []);

  // useEffect(() => {
  //   // Makes axios get request to get individual product info
  //   async function getInfo() {
  //     props.setIsFetching(true);
  //     await axios
  //       .get(`http://localhost:5174/product/wishlist`)
  //       .then((response) => {
  //         console.log("data" + response.data.product);
  //         setProduct(response.data.product);
  //         props.setIsFetching(false);
  //         console.log("products: " + product[0].id);
  //       })
  //       .catch((error) => {
  //         <NotFound />;
  //       });
  //   }
  //   getInfo();
  // }, []);

  // const navigate = useNavigate();

  // const productMapping = products.reduce((acc, product) => {
  //   acc[product.id] = product;
  //   return acc;
  // }, {});

  // const cartMapping = Object.keys(cart).reduce((acc, id) => {
  //   acc[id] = productMapping[id];
  //   return acc;
  // }, {});

  // const subTotal = Object.values(cartMapping).reduce((acc, product) => {
  //   return (
  //     acc +
  //     calculateItemSubtotal(product.price, getQuantityOfItemInCart(product))
  //   );
  // }, 0);

  // const onCheckoutSubmit = async () => {
  //   const order = await handleOnCheckout();
  //   if (order) {
  //     navigate("/orders");
  //   }
  // };

  // const cartHasItems = Boolean(Object.keys(cartMapping).length);

  // return (
  //   <div className="wishlist">
  //     {product.map((element, idx) => {

  //       return (
  //         <div className="wishlist-details">

  //           <img src={element.product_image} alt={element.product_name} />

  //           <p>
  //             {" "}
  //             {element.product_name} ${element.product_price}
  //           </p>
  //           <br></br>
  //         </div>

  //       );
  //     })}
  const [btnClass, setBtnClass] = useState(true);

  if (!isFetching) {
    // const cart = JSON.parse(localStorage.getItem("Products"));
    // console.log("this is cart " + cart);
    return (
      <div className="wishlist-page">
        <div className="banner">
          <h1>Wishlist</h1>
        </div>
        <div className="wishlist">
          {product.map((item, idx) => {
            return (
              <div className="item" key={idx}>
                <div className="buttons">
                  <span className="delete-btn">
                    <ClearIcon />
                  </span>
                  <span
                    className="like-btn"
                    onClick={() => {
                      btnClass ? setBtnClass(false) : setBtnClass(true);
                    }}
                  >
                    {" "}
                    {btnClass ? (
                      <FavoriteIcon style={{ color: "#B86B77" }} />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                    {/* <FavoriteBorderIcon /> */}
                  </span>
                </div>
                <div className="image">
                  <img
                    className="product-img"
                    src={item.product_image}
                    alt={item.product_name}
                  />
                </div>
                <div className="description">
                  <span className="store">{item.store_name}</span>
                  <span className="name">{item.product_name}</span>
                </div>
                <span className="price">${item.product_price}</span>
                <div className="add-to-cart">
                  <button>
                    <AddShoppingCartIcon
                      onClick={() =>
                        apiClient.addToShoppingCart(item.product_id)
                      }
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

// const CartItem = ({ product, quantity, addToCart, removeFromCart }) => {
//   return (
//     <div className="CartItem">
//       <div className="item-info">
//         <div className="item">
//           <img className="image" src="" alt="product cover" />
//           <div className="name-and-price">
//             <p className="name">{product.name}</p>
//             <p className="price">{formatPrice(product.price)}</p>
//           </div>

//           <div className="actions">
//             <div className="buttons">
//               <button onClick={addToCart}>
//                 <i className="material-icons">add</i>
//               </button>
//               <span>{quantity}</span>
//               <button onClick={removeFromCart}>
//                 <i className="material-icons">remove</i>
//               </button>
//             </div>

//             <div className="trash">
//               <button onClick={removeFromCart}>
//                 <i className="material-icons">delete</i>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="item-subtotals">
//         <div className="subtotals">
//           <span>{formatPrice(quantity * product.price)}</span>
//         </div>
//       </div>
//     </div>
//   );
// };
