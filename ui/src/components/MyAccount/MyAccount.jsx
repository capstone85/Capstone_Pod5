import * as React from "react";
import "./MyAccount.css";
import LoginPage from "../../../Login/LoginPage";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import DashboardLinks from "./DashboardLinks/DashboardLinks";
import Footer from "../Footer/Footer";

export default function MyAccount(props) {
  return (
    <div className="MyAccount">
      {props.isLoggedIn ? (
        <main>
          <div className="MyAccount-header">
            <h1>MY ACCOUNT</h1>
            <hr
              style={{ transform: "translateY(30px) ", width: "1530px" }}
            ></hr>
          </div>
          {/* <DashboardLinks
              handleLogout={props.handleLogout}
              isLoggedIn={props.isLoggedIn}
              user={props.user}
              setUser={props.setUser}
            /> */}
          <div className="MyAccount-dashboard">
            <Dashboard user={props.user} handleLogout={props.handleLogout} />
          </div>
          <Footer />
        </main>
      ) : (
        <LoginPage
          isLoggedIn={props.isLoggedIn}
          isClicked={props.isClicked}
          setIsClicked={props.setIsClicked}
          setIsLoggedIn={props.setIsLoggedIn}
          user={props.user}
          setUser={props.setUser}
        />
      )}
    </div>
  );
}
