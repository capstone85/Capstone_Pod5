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
        <h2>Orders</h2>
      </div>

      <Footer />
    </div>
  );
}
