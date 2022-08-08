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
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function ShoppingCart(props) {
  //fetch data from shopping cart table
  const [isFetching, setIsFetching] = useState(false);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  let sutotal = 0;
  let taxes = 0;

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
  const [btnClass, setBtnClass] = useState(false);
  return (
    <>
      <div className="cart-banner">
        <h1>Cart</h1>
      </div>
      <div className="cart-page">
        <div className="shopping-cart">
          {product.map((item, idx) => {
            // console.log(item.product_image);
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
                <div className="quantity">
                  <span> Quantity: 1 </span>
                  <button className="minus-btn" type="button" name="button">
                    {/* <img src="" alt="plus-btn" /> */}-
                  </button>
                  {/* <input type="text" name="name" value="1" /> */}

                  <button className="plus-btn" type="button" name="button">
                    {/* <img src="" alt="minus-btn" /> */}+
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="shopping-cart-totals">
          <h1>Totals</h1>
          <table className="labels">
            <tbody>
              <tr>
                <td className="subtotal">SUBTOTAL</td>
                <td>$65.00</td>
              </tr>
              <tr>
                <td className="delivery">DELIVERY FEE</td>
                <td>$10.00</td>
              </tr>
            </tbody>
          </table>
          <hr className="checkout-hr"></hr>
          <div className="total">
            <span className="total-label">TOTAL</span>
            <span className="total-price">$75.00</span>
          </div>
          <div className="checkout-btn-wrapper">
            <button className="checkout-btn">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </>
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
