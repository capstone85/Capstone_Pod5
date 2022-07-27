import * as React from "react";
// import "./ExerciseDetail.css";
import StoreCard from "./StoreCard";
import { useParams } from "react-router-dom";

export default function StoreDetail(props) {
  const { storeId } = useParams();

  return (
    <div className="store-detail">
      {props.store.map((element, idx) => {
        if (element.id == storeId) {
          const date = new Date(element.created_at);
          const enUSFormatter = new Intl.DateTimeFormat("en-US");
          return (
            <StoreCard
              key={idx}
              name={element.name}
              location={element.location}
              description={element.description}
              logo={element.logo}
              created_at={enUSFormatter.format(date)}
            ></StoreCard>
          );
        }
      })}
    </div>
  );
}
