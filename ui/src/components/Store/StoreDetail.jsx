import * as React from "react";
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
          const isVendor = props.user?.category === "vendor";
          return isVendor ? (
            <StoreCard
              key={idx}
              id={element.id}
              name={element.name}
              location={element.location}
              zipcode={element.zipcode}
              description={element.description}
              logo={element.logo}
              created_at={enUSFormatter.format(date)}
            ></StoreCard>
          ) : (
            <ShopperCard
              key={idx}
              id={element.id}
              name={element.name}
              location={element.location}
              zipcode={element.zipcode}
              description={element.description}
              logo={element.logo}
              created_at={enUSFormatter.format(date)}
            />
          );
        }
      })}
    </div>
  );
}
