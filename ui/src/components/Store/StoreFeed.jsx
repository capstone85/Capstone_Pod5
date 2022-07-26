import * as React from "react";
import "./StoreFeed.css";
import StoreCard from "./StoreCard";
import apiClient from "../../services/apiClient";
import { useEffect, useState } from "react";
import axios from "axios";
export default function StoreFeed(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [store, setStore] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      if (!(Object.keys(props.user).length === 0)) {
        setIsFetching(true);
        console.log("users.", props.user);

        const { data, error } = await apiClient.listStores(props.user.id);
        if (error) {
          setError(error);
        }
        if (data) {
          console.log("data", data);
          setStore(data.stores);
        }
        setIsFetching(false);
      }
    };

    fetchStores();
  }, [props.user]);
  return (
    <>
      {store.length === 0 ? (
        <div className="empty">
          <h2>Nothing here yet.</h2>
        </div>
      ) : (
        store.map((element, idx) => {
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
        })
      )}
    </>
  );
}
