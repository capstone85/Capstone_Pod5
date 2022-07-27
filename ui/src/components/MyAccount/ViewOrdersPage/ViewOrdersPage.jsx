import * as React from "react";
import "./ViewOrdersPage.css";
import DashboardLinks from "../DashboardLinks/DashboardLinks";
import Footer from "../../Footer/Footer";

export default function ViewOrdersPage() {
  return (
    <div>
      <DashboardLinks  handleLogout={props.handleLogout}
              isLogin={props.isLogin}
              user={props.user}
              setUser={props.setUser}/>
      <h1>Orders</h1>
      <Footer />
    </div>
  );
}
