import * as React from "react";
// import "./ExerciseCard.css";

export default function StoreCard(props) {
  return (
    <div className="store-card">
      <div className="card-header">
        <h2 className="titles">{props.name}</h2>
      </div>
      <div className="card-stats">
        <div className="cardStat">
          <p>Location</p>
          <span>{props.location}</span>
        </div>
        <div className="cardStat">
          <p>Logo</p>
          <span>{props.logo}</span>
        </div>
      </div>
      <div className="card-meta">
        <small>{props.created_at}</small>
        <small className="category">{props.description}</small>
      </div>
    </div>
  );
}