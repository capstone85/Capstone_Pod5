import * as React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StoreCard from "../Store/StoreCard";
import StoreOverview from "../Store/StoreOverview";
import apiClient from "../../services/apiClient";
import Footer from "../Footer/Footer";

import ShopperCard from "../Store/ShopperCard";
export default function Home(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [store, setStore] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchStores = async () => {
      setIsFetching(true);

      const { data, error } = await apiClient.listAllStores();
      if (error) {
        setError(error);
      }
      if (data) {
        console.log("data", data);
        setStore(data.stores);
      }
      setIsFetching(false);
    };

    fetchStores();
  }, []);
  return (
    <div className="home">
      <main>
        <div className="banner">
          <h1>STORES NEAR YOU</h1>
          <hr style={{ transform: "translateY(60px) ", width: "1530px" }}></hr>
          {store.map((element, idx) => {
            const date = new Date(element.created_at);
            const enUSFormatter = new Intl.DateTimeFormat("en-US");
            const isVendor = props.user?.category === "vendor";
            return isVendor ? (
              <StoreCard
                key={idx}
                id={element.id}
                name={element.name}
                location={element.location}
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
                description={element.description}
                logo={element.logo}
                created_at={enUSFormatter.format(date)}
              />
            );
          })}
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
