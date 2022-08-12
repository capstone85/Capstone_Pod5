import * as React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StoreCard from "../Store/StoreCard";
import StoreOverview from "../Store/StoreOverview";
import apiClient from "../../services/apiClient";
import Footer from "../Footer/Footer";
import axios from "axios";
import ShopperCard from "../Store/ShopperCard";
// import { ContactSupportOutlined } from "@material-ui/icons";

export default function Home(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [stores, setStores] = useState([]);
  const [sortedStores, setSortedStores] = useState([]);
  const [newStores, setNewStores] = useState([]);
  const [error, setError] = useState(null);
  const [difference, setDifference] = useState(null);
  useEffect(() => {
    const fetchStores = async () => {
      setIsFetching(true);

      const { data, error } = await apiClient.listAllStores();
      if (error) {
        setError(error);
      }
      if (data) {
        console.log("data", data);
        setStores(data.stores);
      }
      setIsFetching(false);
    };

    fetchStores();
  }, []);

  // async function getDistance(store) {
  //   const { zipcode } = store;
  //   console.log("store here", store);
  //   const apiUrl = `https://zipcodeapi.com/rest/js-Jo8L4fqW6lLGx9uuk7CopIhS0Epzg3PoQjoe2ZoFdq5jXLbZGNvvYxmj5xdiS3cg/distance.json/${props.location.userlocation}/${zipcode}/km`;
  //   try {
  //     const response = await axios.get(apiUrl);
  //     const { distance } = response.data;
  //     console.log("response here", response);
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   console.log("distance here", distance, store.id);
  //   return { ...store, distance };
  // }
  async function getDistance(store) {
    const [zip1, zip2] = [store.zipcode, props.location.userlocation];
    console.log("zip1", zip1);
    console.log("zip2", zip2);
    return { ...store, distance: Math.abs(zip1 - zip2) };
  }
  async function convertStores() {
    console.log("first console");
    const promiseArray = stores.map((store) => getDistance(store));
    console.log("second console");
    const updatedStores = await Promise.all(promiseArray);
    console.log("updated stores1", updatedStores);
    updatedStores.sort(({ distance: a }, { distance: b }) =>
      a < b ? -1 : a == b ? 0 : 1
    );
    console.log("updated stores2", updatedStores);
    setNewStores(updatedStores);
    //console.log("updated stores2", updatedStores);
  }
  useEffect(() => {
    console.log("new stores changed", newStores);
  }, [newStores]);

  //   async function getDifference(zipcode) {
  //     try {
  //       const response = await axios.get(
  //         `https://zipcodeapi.com/rest/js-Jo8L4fqW6lLGx9uuk7CopIhS0Epzg3PoQjoe2ZoFdq5jXLbZGNvvYxmj5xdiS3cg/distance.json/${props.userlocation}/${zipcode}/km
  // `
  //       );
  //       //setDifference(response.data);
  //       console.log("response data", response);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   }

  // const updateObjectInArray = () => {
  //   if (props.location.userlocation.length != 5 || !difference) {
  //     return;
  //   }
  //   console.log("difference", difference);
  //   setStores(
  //     store.map((obj) => {
  //       getDifference(obj.zipcode);
  //       return { ...obj, diff: difference };
  //     })
  //   );
  // };

  useEffect(() => {
    // updateObjectInArray();
    if (props.location.userlocation.length != 5 || !stores) {
      return;
    }
    console.log("converting stores");
    convertStores();
  }, [props.location, stores]);

  return (
    <div className="home">
      <main>
        <div className="banner">
          <h1>STORES NEAR YOU</h1>
          <hr style={{ transform: "translateY(60px) ", width: "1530px" }}></hr>
        </div>
        <div>
          {newStores.map((element, idx) => {
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
          })}
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
