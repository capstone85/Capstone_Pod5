import * as React from "react";
// import "./ExerciseDetail.css";
import StoreCard from "./StoreCard";
import { useParams } from "react-router-dom";

export default function StoreDetail(props) {
  const { storeId } = useParams();
  //   const overview = [
  //     {
  //       id: 1,
  //       name: "apple",
  //       url: "",
  //       calories: 500,
  //       quantity: 2,
  //       date: "01/11/2000",
  //       category: "fruit",
  //     },
  //     {
  //       id: 2,
  //       name: "milk",
  //       url: "",
  //       calories: 100,
  //       quantity: 3,
  //       date: "12/11/2055",
  //       category: "dairy",
  //     },
  //     {
  //       id: 3,
  //       name: "carrot",
  //       url: "",
  //       calories: 220,
  //       quantity: 1,
  //       date: "01/16/2023",
  //       category: "vegetables",
  //     },
  //     {
  //       id: 4,
  //       name: "bread",
  //       url: "",
  //       calories: 660,
  //       quantity: 1,
  //       date: "01/16/2023",
  //       category: "carbs",
  //     },
  //   ];
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
