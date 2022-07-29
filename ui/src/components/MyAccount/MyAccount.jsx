import * as React from "react";
import "./MyAccount.css";
import LoginPage from "../../../Login/LoginPage";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import DashboardLinks from "./DashboardLinks/DashboardLinks";
import Footer from "../Footer/Footer";

export default function MyAccount(props) {
  //   console.log(props.user.name);
  return (
    <div className="MyAccount">
      <main>
        <div className="header">
          <p>My Account </p>
          <DashboardLinks
            handleLogout={props.handleLogout}
            isLogin={props.isLogin}
            user={props.user}
            setUser={props.setUser}
          />
          <Dashboard user={props.user} />
          <Footer />
        </div>
      </main>
    </div>
  );
}
