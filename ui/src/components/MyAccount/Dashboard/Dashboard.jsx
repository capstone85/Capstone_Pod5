import * as React from "react";
import "./Dashboard.css";
import { useEffect } from "react";

export default function Dashboard(props) {
  useEffect(() => {
    console.log("dashboard", props.user);
  }, [props.user]);

  return (
    <div className="body">
      <p>Hello {props.user ? props.user.first_name : null}</p>
      <p>
        From your account dashboard you can view your recent orders, manage your
        shipping and billing addresses, and edit your password and account
        details.
      </p>
    </div>
  );
}
