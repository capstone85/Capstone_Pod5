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

export default function Wishlist(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!(Object.keys(props.user).length === 0)) {
        setIsFetching(true);
        console.log("users.", props.user);

        const { data, error } = await apiClient.listAllWishlist(props.user.id);
        if (error) {
          setError(error);
        }
        if (data) {
          console.log("data", data);
          console.log(data.products);
          console.log(data.products[0].product_name);
          setProduct(data.products);
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

  return (
    <div className="wishlist">
      {product.map((element, idx) => {
       
        return (
          <div className="wishlist-details">
            
            <img src={element.product_image} alt={element.product_name} />

            <p>
              {" "}
              {element.product_name} ${element.product_price}
            </p>
            <br></br>
          </div>
        
        );
      })}
      {/* {/* {product ? (
        product.map((element, idx) => {
          // const date = new Date(element.created_at);
          // const enUSFormatter = new Intl.DateTimeFormat("en-US");
          return <h2>{element.name}</h2>;
        }) */}
      {/* {product.length === 0 ? (
        <div className="empty">
          <h2>Nothing here yet.</h2>
        </div>
      ) : (
        product.map((element, idx) => {
          return <h2>{element.name}</h2>;
        })
      )} */}
      {/*  )} */}
      {/* <div className="banner">
        <div className="content">
          <h2>Wishlist - {getTotalItemsInCart()} items</h2>
        </div>
      </div>

      <div className="content">
        <div className="wishlist-items">
          <div className="items-list">
            {!cartHasItems ? (
              <div className="card">
                <p>Nothing in your wishlist yet.</p>
              </div>
            ) : null}
            {Object.values(cartMapping).map((product) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={getQuantityOfItemInCart(product)}
                addToCart={() => addToCart(product)}
                removeFromCart={() => removeFromCart(product)}
              />
            ))}
          </div>
        </div>

        {cartHasItems ? (
          <div className="receipt">
            <div className="receipt-subtotal">
              <span className="label">Subtotal</span>
              <span>{formatPrice(subTotal)}</span>
            </div>
            <div className="receipt-taxes">
              <span className="label">Taxes and Fees</span>
              <span>{formatPrice(calculateTaxesAndFees(subTotal))}</span>
            </div>
            <div className="receipt-total">
              <span className="label">Total</span>
              <span>{formatPrice(calculateTotal(subTotal))}</span>
            </div>
          </div>
        ) : null}

        <div className="checkout">
          {user?.email ? (
            <button onClick={onCheckoutSubmit}>Checkout</button>
          ) : (
            <Link to="/shopping-cart" path={LoginPage}>
              Add to shopping cart
            </Link>
          )}
        </div>
        <Footer></Footer>
      </div> */}
    </div>
  );
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
