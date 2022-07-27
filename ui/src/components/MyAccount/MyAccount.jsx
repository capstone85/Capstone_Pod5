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
      {/* {props.user.name ? ( */}
      <main>
        <div className="header">
          <p>My Account </p>
<<<<<<< HEAD
          <DashboardLinks
            handleLogout={props.handleLogout}
            isLogin={props.isLogin}
            user={props.user}
            setUser={props.setUser}
          />
=======
          <DashboardLinks  handleLogout={props.handleLogout}
              isLogin={props.isLogin}
              user={props.user}
              setUser={props.setUser}/>
>>>>>>> 02fa01f49b7983207085c088f2be02d93325fc5e
          <Dashboard />
          <Footer />
        </div>
      </main>
      {/* ) : (
        <LoginPage user={props.user} setUser={props.setUser}></LoginPage>
      )} */}
    </div>
  );
}
