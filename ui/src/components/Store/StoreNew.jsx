import * as React from "react";
// import "./ExerciseNew.css";
import StoreForm from "./StoreForm";

//add store page
export default function StoreNew(props) {
  return (
    <div className="store-new">
      <StoreForm addStore={props.addStore}></StoreForm>
    </div>
  );
}
