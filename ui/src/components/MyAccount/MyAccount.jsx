import * as React from "react";
import "./MyAccount.css";
import LoginPage from "../../../Login/LoginPage";
import { Link } from "react-router-dom";

export default function MyAccount(props) {
  console.log(props);
  return (
    <div className="MyAccount">
      {/* {props.user.name ? ( */}
      <main>
        <div className="MyAccount">
          <p>My Account </p>
          <div className="dashboard-links">
            <ul className="links">
              <li>Dashboard</li>
              <li>Orders</li>
              <li>Logout</li>
            </ul>

            <p>Hello name (not name? Log out)</p>
            <p>
              From your account dashboard you can view your recent orders,
              manage your shipping and billing addresses, and edit your password
              and account details.
            </p>
          </div>
        </div>
      </main>
      {/* ) : (
        <LoginPage user={props.user} setUser={props.setUser}></LoginPage>
      )} */}
    </div>
  );
}
