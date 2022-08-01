import * as React from "react";
import "./ProductCategories.css";

// Renders selector to toggle different categories on product grid
export default function Selector(props) {
  let buttonClassName = props.isActive ? "my-label active" : "my-label";

  return (
    <div className="category-menu">
      <button className={buttonClassName} onClick={props.onClick}>
        <p className={buttonClassName}>
          {capitalizeFirst(props.label).toUpperCase()}{" "}
        </p>
      </button>
    </div>
  );
}

function capitalizeFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
