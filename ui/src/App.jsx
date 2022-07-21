
import "./App.css";
import Searchbar from "./components/LandingPage/LandingPage";



import * as React from "react"
import { useState,useEffect } from "react";
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
 import apiClient from "../services/apiClient"
function App() {
  const [count, setCount] = useState(0);

  const [appState, setAppState] = useState({})
  const [sessionId, setSessionId] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [ user, setUser ] = useState("hi monica");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await apiClient.fetchUserFromToken();
      if (data) {
        setUser(data.user);
      }
      if (error) {
        setError(error);
      }
    };

    const token = localStorage.getItem("lifetracker_token");
    if (token) {
      apiClient.setToken(token);
      fetchUser();
    }
  }, [setUser]);
  const handleLogout = async () => {
    await apiClient.logoutUser();
    setUser({});
    setError(null);
  };
 

  return (
    <div className="app">
    <Searchbar />
      <BrowserRouter>
      {/* <Navbar   handleLogout={handleLogout}
              isLogin={isLogin}
              user={user}
              setUser={setUser}/> */}
      <main>
      <Routes>
     {/* <Route path="/" element={ <Home />}/> */}

                    {/* isLogin={isLogin}
                    user={user}
                    setUser={setUser}/>}/> */}
     {/* <Route path="/AddExercise" element={ <AddExercise appState={appState}/>}/> */}
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
    
        </Routes>

      </main>
    
     
      </BrowserRouter>
    
    </div>
  );
}


export default App;
