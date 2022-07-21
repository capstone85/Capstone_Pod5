
import * as React from "react"
import { useState,useEffect } from "react";
//import logo from "./logo.svg";
//import "./App.css";
//import Button from "@mui/material/Button";
//import Container from "@mui/material/Container";
import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
//import {React} from "react"
//import { AuthContextProvider, useAuthContext } from "./context/auth";
// import Navbar from "./Components/Navbar";
// import Home from "./Components/Home"
// import Signup from "./Components/Signup";
// import Login from "./Components/Login";
import LoginPage from "./Login/LoginPage";
import SignUpPage from "./Register/SignupPage";
 import apiClient from "./services/apiClient"
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












// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'



// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <div className="App">
// //       <div>
// //         <a href="https://vitejs.dev" target="_blank">
// //           <img src="/vite.svg" className="logo" alt="Vite logo" />
// //         </a>
// //         <a href="https://reactjs.org" target="_blank">
// //           <img src={reactLogo} className="logo react" alt="React logo" />
// //         </a>
// //       </div>
// //       <h1>Vite + React</h1>
// //       <div className="card">
// //         <button onClick={() => setCount((count) => count + 1)}>
// //           count is {count}
// //         </button>
// //         <p>
// //           Edit <code>src/App.jsx</code> and save to test HMR
// //         </p>
// //       </div>
// //       <p className="read-the-docs">
// //         Click on the Vite and React logos to learn more
// //       </p>
// //     </div>
// //   )
// // }

export default App
