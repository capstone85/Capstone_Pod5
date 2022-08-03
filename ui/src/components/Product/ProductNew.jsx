import * as React from "react";
// import "./ExerciseNew.css";
import ProductForm from "./ProductForm";

export default function ProductNew(props) {
  return (
    <div className="product-new">
      <ProductForm addProduct={props.addProduct}></ProductForm>
    </div>
  );
}
