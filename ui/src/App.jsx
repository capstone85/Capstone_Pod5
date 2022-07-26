import "./App.css";
import Searchbar from "./components/LandingPage/LandingPage";

import * as React from "react";
import { useState, useEffect } from "react";
//import Sidebar from "./components/Sidebar/Sidebar";
//import Button from "@mui/material/Button";
//import Container from "@mui/material/Container";

import {
  BrowserRouter,
  Link,
  Route,
  Router,
  Routes,
  useParams,
} from "react-router-dom";
//import {React} from "react"
//import { AuthContextProvider, useAuthContext } from "./context/auth";
import Wishlist from "./components/Wishlist/Wishlist";
import LoginPage from "../Login/LoginPage";
import SignUpPage from "../Register/SignupPage";
import apiClient from "./services/apiClient";
import ShopperNavbar from "./components/Navbar/ShopperNavbar";
import LandingPage from "./components/LandingPage/LandingPage";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import StorePage from "./components/Store/StorePage";
import Footer from "./components/Footer/Footer";
import { AuthContextProvider, useAuthContext } from "./context/auth";
import VendorNavbar from "./components/Navbar/VendorNavbar";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import Confirmation from "./components/Confirmation/Confirmation";
import ProductDetail from "./components/Product/ProductDetail";

import Checkout from "./components/Checkout/Checkout";
import {
  removeFromCart,
  addToCart,
  getQuantityOfItemInCart,
  getTotalItemsInCart,
} from "./utils/cart";

import MyAccount from "./components/MyAccount/MyAccount";
import Dashboard from "./components/MyAccount/Dashboard/Dashboard";
import ViewOrdersPage from "./components/MyAccount/ViewOrdersPage/ViewOrdersPage";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ProductsPage from "./components/Product/ProductsPage";
import SearchPage from "./components/Search/SearchPage";
import StoreNew from "./components/Store/StoreNew";
import ProductNew from "./components/Product/ProductNew";
import ProductView from "./components/Product/ProductView";
import Navbar from "./components/Navbar";
function App() {
  const [count, setCount] = useState(0);
  // const navigate = useNavigate();
  const [appState, setAppState] = useState({});
  const [sessionId, setSessionId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [isFetchingStore, setIsFetchingStore] = useState(false);
  const [store, setStore] = useState([]);
  const [product, setProduct] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchbar, setSearchbar] = useState(""); // for search results
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState({});
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);
  const [shownavbar, setshownavbar] = useState(false);
  const [location, setLocation] = useState({
    userlocation: "",
  });

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const handleOnSearchbarChange = (value) => {
    setSearchbar(value);
  };

  const handleAddItemToCart = (productId) => {
    let copyCart = [...cart];
    let found = false;
    copyCart.map((item, index) => {
      // find item in DB, if exists, increment, if it doesn't exist, create
      if (item.itemId === productId) {
        copyCart[index].quantity += 1;
        found = true;
      }
    });
    if (!found) {
      copyCart.push({ itemId: productId, quantity: 1 });
    }
    setCart(copyCart);
  };

  const handleRemoveItemFromCart = (productId) => {
    let copyCart = [...cart];
    copyCart.map((item, index) => {
      // find item in DB, if doesn't exist = error, if exists and q = 1, delete.
      // if exists, decrement.
      if (item.itemId === productId) {
        copyCart[index].quantity = copyCart[index].quantity - 1;
        if (copyCart[index].quantity == 0) {
          copyCart.splice(index, 1);
        }
      }
    });
    setCart(copyCart);
  };

  const handleOnCheckout = async () => {
    setIsCheckingOut(true);
  };
  // useEffect(() => {
  //   setshownavbar(!window.location.pathname.startsWith("/store"));
  //   //setshownavbar(true)
  // }, [window.location.pathname]);
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken();
      if (data) {
        setUser(data.user);
        // console.log("datauser:", data.user);
        setIsLoggedIn(true);
        // console.log("user: ", user);
      }
      if (error) {
        setError(error);
      }
    };

    const token = localStorage.getItem("lifetracker_token");
    // console.log("TOKEN" + token);
    if (token) {
      apiClient.setToken(token);
      fetchUser();
    }
  }, [setUser]);

  const handleLogout = async () => {
    await apiClient.logoutUser();
    // console.log("logged out");
    setUser([]);
    setError(null);
    setIsLoggedIn(false);
  };

  const addStore = (newStore) => {
    setStore((oldStore) => [newStore, ...oldStore]);
  };

  const addProduct = (newProduct) => {
    setProducts((oldProduct) => [newProduct, ...oldProduct]);
  };

  return (
    <BrowserRouter>
      {/* <h1>{user?.email}</h1> */}
      <Navbar
        handleLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setIsClicked={setIsClicked}
        user={user}
        setUser={setUser}
      />
      {/* {shownavbar ? (
          <Navbar
            handleLogout={handleLogout}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setIsClicked={setIsClicked}
            user={user}
            setUser={setUser}
          />
        ) : (
          <VendorNavbar
            handleLogout={handleLogout}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user}
            setUser={setUser}
          />
        )} */}

      <main>
        <Routes>
          {/* landing page route */}
          <Route
            path="/"
            element={
              <LandingPage location={location} setLocation={setLocation} />
            }
          />
          {/* <Route path="/sidebar" element={<Sidebar />} /> */}
          <Route
            path="/store-page"
            element={
              <Home
                user={user}
                store={store}
                addToCart={handleAddItemToCart}
                removeFromCart={handleOnRemoveFromCart}
                getQuantityOfItemInCart={handleGetItemQuantity}
                location={location}
              />
            }
          />

          {/* isLogin={isLogin}
                    user={user}
                    setUser={setUser}/>}/> */}
          {/* <Route path="/AddExercise" element={ <AddExercise appState={appState}/>}/> */}

          {/* login route */}
          <Route
            path="/login"
            element={
              <LoginPage
                isLoggedIn={isLoggedIn}
                isClicked={isClicked}
                setIsClicked={setIsClicked}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                setUser={setUser}
              ></LoginPage>
            }
          ></Route>

          {/* register route */}
          <Route
            path="/register"
            element={
              <SignUpPage
                user={user}
                setUser={setUser}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setIsClicked={setIsClicked}
              ></SignUpPage>
            }
          ></Route>
          {/* not found */}
          <Route path="*" element={<NotFound />} />

          <Route
            path="/search"
            element={
              <SearchPage
                handleOnSearchbarChange={handleOnSearchbarChange}
                products={products}
                searchbar={searchbar}
                setSearchbar={setSearchbar}
              />
            }
          />
          <Route
            path="/wishlist"
            element={
              <Wishlist
                setIsFetching={setIsFetching}
                isClicked={isClicked}
                user={user}
                cart={cart}
                error={error}
                setUser={setUser}
                products={products}
                searchInputValue={searchInputValue}
                handleOnSearchInputChange={handleOnSearchInputChange}
                addToCart={handleOnAddToCart}
                removeFromCart={handleOnRemoveFromCart}
                getQuantityOfItemInCart={handleGetItemQuantity}
                getTotalItemsInCart={handleGetTotalCartItems}
                isCheckingOut={isCheckingOut}
                handleOnCheckout={handleOnCheckout}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          {/* My account routes */}
          {/* main page that shows when users go to their account --> page with dashboard */}
          <Route
            path="/dashboard"
            element={
              <MyAccount
                handleLogout={handleLogout}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setIsClicked={setIsClicked}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route path="/orders" element={<ViewOrdersPage user={user} />} />

          <Route
            path="/store"
            element={
              <StorePage
                store={store}
                addStore={addStore}
                user={user}
                setUser={setUser}
              />
            }
          />

          <Route
            path="/store/*"
            element={
              <StorePage
                store={store}
                addStore={addStore}
                user={user}
                setUser={setUser}
              />
            }
          />
          {/* creating a new product for specific store  */}
          <Route
            path="/store-page/create/:storeId"
            element={
              <ProductNew
                product={product}
                addProduct={addProduct}
                user={user}
                setUser={setUser}
              />
            }
          />
          {/* product page for specific store  */}
          <Route
            path="/store-page/:storeId"
            element={
              <ProductsPage
              user={user}
                // products={
                //   activeCategory == "All Categories" ? products : currentItems
                // }
                // activeCategory={activeCategory}
                handleAddItemToCart={handleAddItemToCart}
                handleRemoveItemFromCart={handleRemoveItemFromCart}
                // setActiveCategory={setActiveCategory}
                handleOnSearchbarChange={handleOnSearchbarChange}
                // categories={categories}
                cart={cart}
                setIsFetching={setIsFetching}
                searchbar={searchbar}
                setSearchbar={setSearchbar}
                store={store}
              />
            }
          />

          {/* Specific product based on id */}
          <Route
            path="/products/:productId"
            element={
              <ProductView
                //  handleAddItemToCart={handleAddItemToCart}
                //  handleRemoveItemFromCart={handleRemoveItemFromCart}
                //  shoppingCart={shoppingCart}
                //  isOpen={isOpen}
                products={products}
                user={user}
                store={store}
                isFetching={isFetching}
                setIsFetching={setIsFetching}
                // handleOnCheckoutFormChange={handleOnCheckoutFormChange}
                // handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
                // handleOnToggle={handleOnToggle}
                // checkoutForm={checkoutForm}
                // subtotal={subtotal}
                // cartSize={shoppingCart.length}
              />
            }
          ></Route>
          <Route
            path="/shopping-cart"
            element={
              <ShoppingCart
                user={user}
                cart={cart}
                error={error}
                setUser={setUser}
                products={products}
                searchInputValue={searchInputValue}
                handleOnSearchInputChange={handleOnSearchInputChange}
                addToCart={handleAddItemToCart}
                removeFromCart={handleOnRemoveFromCart}
                getQuantityOfItemInCart={handleGetItemQuantity}
                getTotalItemsInCart={handleGetTotalCartItems}
                isCheckingOut={isCheckingOut}
                handleOnCheckout={handleOnCheckout}
              />
            }
          />
          <Route path="/checkout" element={<Checkout user={user} />}></Route>

          <Route
            path="/confirmation/:confirmation"
            element={<Confirmation user={user} />}
          ></Route>
        </Routes>
      </main>
    </BrowserRouter>
    // </div>
  );
}

export default App;
