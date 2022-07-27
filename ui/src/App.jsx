import "./App.css";
import Searchbar from "./components/LandingPage/LandingPage";

import * as React from "react";
import { useState, useEffect } from "react";
//import logo from "./logo.svg";
//import Button from "@mui/material/Button";
//import Container from "@mui/material/Container";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
//import {React} from "react"
//import { AuthContextProvider, useAuthContext } from "./context/auth";
// import Navbar from "./Components/Navbar";
// import Home from "./Components/Home"
// import Signup from "./Components/Signup";
// import Login from "./Components/Login";
import LoginPage from "../Login/LoginPage";
import SignUpPage from "../Register/SignupPage";
import apiClient from "./services/apiClient";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./components/LandingPage/LandingPage";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import StorePage from "./components/Store/StorePage";
import Footer from "./components/Footer/Footer";

import ShoppingCart from "./components/Shoppingcart/Shoppingcart";
import {
  removeFromCart,
  addToCart,
  getQuantityOfItemInCart,
  getTotalItemsInCart,
} from "./utils/cart";

import MyAccount from "./components/MyAccount/MyAccount";
import SignUpVendor from "../Register/SignUpVendor";
import Dashboard from "./components/MyAccount/Dashboard/Dashboard";
import ViewOrdersPage from "./components/MyAccount/ViewOrdersPage/ViewOrdersPage";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0);
  // const navigate = useNavigate();
  const [appState, setAppState] = useState({});
  const [sessionId, setSessionId] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [isFetchingStore, setIsFetchingStore] = useState(false);
  const [store, setStore] = useState([]);

  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState({});
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleOnRemoveFromCart = (item) => setCart(removeFromCart(cart, item));
  const handleOnAddToCart = (item) => setCart(addToCart(cart, item));
  const handleGetItemQuantity = (item) => getQuantityOfItemInCart(cart, item);
  const handleGetTotalCartItems = () => getTotalItemsInCart(cart);

  const handleOnSearchInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const handleOnCheckout = async () => {
    setIsCheckingOut(true);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken();
      if (data) {
        setUser(data.user);

        console.log(data.user);
        console.log(user.username);
      }
      if (error) {
        setError(error);
      }
    };

    const token = localStorage.getItem("clothing_token");
    if (token) {
      apiClient.setToken(token);
      fetchUser();
    }
  }, [setUser]);
  const handleLogout = async () => {
    await apiClient.logoutUser();
    console.log("logged out");
    setUser({});
    setError(null);
  };

  const addStore = (newStore) => {
    setStore((oldStore) => [newStore, ...oldStore]);
  };

  return (
    <div className="app">
      {/* <Navbar /> */}
      {/* <LandingPage /> */}
      {/* <MyAccount
      // user={user}
      // isLogin={isLogin}
      // setUser={setUser}
      // name={user.name}
      /> */}
      <BrowserRouter>
        <Navbar
          handleLogout={handleLogout}
          isLogin={isLogin}
          user={user}
          setUser={setUser}
        />

        <main>
          <Routes>
            {/* landing page route */}
            <Route path="/" element={<LandingPage />} />

            <Route path="/home" element={<Home />} />

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

            {/* isLogin={isLogin}
                    user={user}
                    setUser={setUser}/>}/> */}
            {/* <Route path="/AddExercise" element={ <AddExercise appState={appState}/>}/> */}

            {/* login route */}
            <Route
              path="/login"
              element={
                <LoginPage
                  isLogin={isLogin}
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
                  isLogin={isLogin}
                ></SignUpPage>
              }
            ></Route>
            {/* not found */}
            <Route path="*" element={<NotFound />} />


            {/* My account routes */}
            {/* main page that shows when users go to their account --> page with dashboard */}
            <Route
              path="/dashboard"
              element={<MyAccount handleLogout={handleLogout} />}
            />
            <Route path="/orders" element={<ViewOrdersPage />} />

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
            <Route
              path="/shopping-cart"
              element={
                <ShoppingCart
                  user={user}
                  cart={cart}
                  error={error}
                  setUser={setUser}
                  products={products}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  searchInputValue={searchInputValue}
                  handleOnSearchInputChange={handleOnSearchInputChange}
                  addToCart={handleOnAddToCart}
                  removeFromCart={handleOnRemoveFromCart}
                  getQuantityOfItemInCart={handleGetItemQuantity}
                  getTotalItemsInCart={handleGetTotalCartItems}
                  isCheckingOut={isCheckingOut}
                  handleOnCheckout={handleOnCheckout}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
