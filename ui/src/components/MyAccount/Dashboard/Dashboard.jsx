import * as React from "react";
import "./Dashboard.css";

export default function Dashboard(props) {
  return (
    <div className="body">
      <p>Hello {props.user.username}</p>
      <p>
        From your account dashboard you can view your recent orders, manage your
        shipping and billing addresses, and edit your password and account
        details.
      </p>
    </div>
  );
}
