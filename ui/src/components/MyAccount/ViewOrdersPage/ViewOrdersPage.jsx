import * as React from "react";
import "./ViewOrdersPage.css";
import DashboardLinks from "../DashboardLinks/DashboardLinks";
import Footer from "../../Footer/Footer";

export default function ViewOrdersPage(props) {
  return (
    <div className="Orders">
      {/* <DashboardLinks
        handleLogout={props.handleLogout}
        isLogin={props.isLogin}
        user={props.user}
        setUser={props.setUser}
      /> */}
      <div className="header">
        <h1>MY ORDERS</h1>
      </div>
      <hr style={{ transform: "translateY(60px) ", width: "1530px" }}></hr>

      <Footer />
    </div>
  );
}
