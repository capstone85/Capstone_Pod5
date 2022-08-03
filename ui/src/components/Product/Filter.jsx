import * as React from "react";
import "./Filter.css";

// Renders selector to toggle different categories on product grid
export default function Selector(props) {
  let buttonClassName = props.isActive ? "my-label active" : "my-label";

  return (
    <div className="category-menu">
      <button className={buttonClassName} onClick={props.onClick}>
        <li className={buttonClassName}>{props.category}</li>
      </button>
    </div>
  );
}

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
