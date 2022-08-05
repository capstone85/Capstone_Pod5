import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { formatPrice } from "../../utils/format";
import {
  calculateItemSubtotal,
  calculateTaxesAndFees,
  calculateTotal,
} from "../../utils/calculations";
import "./ShoppingCart.css";
import LoginPage from "../../../Login/LoginPage";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ClearIcon from "@mui/icons-material/Clear";

export default function ShoppingCart(props) {
  //fetch data from shopping cart table
  const [isFetching, setIsFetching] = useState(false);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!(Object.keys(props.user).length === 0)) {
        setIsFetching(true);
        console.log("users.", props.user);

        const { data, error } = await apiClient.listAllShoppingCart(
          props.user.id
        );
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
    <div className="cart-page">
      <div className="banner">
        <h1>Shopping Bag</h1>
      </div>
      <ul className="shopping-cart">
        {product.map((element, idx) => {
          return (
            <div className="item">
              <div className="buttons">
                <span className="delete-btn">
                  <ClearIcon />
                </span>
                <span className="like-btn">
                  <FavoriteBorderIcon />
                </span>
              </div>
              <div className="image">
                <img src="" alt="" />
              </div>
              <div className="description">
                <span>{element.product_name}</span>
                <span>Store</span>
                <span>Color</span>
              </div>

              <div className="quantity">
                <button className="plus-btn" type="button" name="button">
                  {/* <img src="" alt="plus-btn" /> */}+
                </button>
                {/* <input type="text" name="name" value="1" /> */}
                <button className="minus-btn" type="button" name="button">
                  {/* <img src="" alt="minus-btn" /> */}-
                </button>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

{
  /* <div className="banner">
        <div className="content">
          <h2>Cart - {getTotalItemsInCart()} items</h2>
        </div>
      </div>

      <div className="content">
        <div className="cart-items">
          <div className="items-list">
            {!cartHasItems ? (
              <div className="card">
                <p>Nothing in your cart yet.</p>
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
            <Link to="/login" path={LoginPage}>
              Sign In To Checkout
            </Link>
          )}
        </div>
        <Footer></Footer>
      </div> */
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
