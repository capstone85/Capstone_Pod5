import "./Searchbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import ProductCard from "../Product/ProductCard";
import Selector from "../Product/Filter";

export default function Searchbar(props) {
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const categoriesList = [
    "All Categories",
    "clothing",
    "accessories",
    "footwear",
  ];

  const [isFetching, setIsFetching] = useState(false);
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      setIsFetching(true);

      const { data, error } = await apiClient.listAllProducts();
      if (error) {
        setError(error);
      }
      if (data) {
        console.log("data", data.products);
        setProduct(data.products);
      }
      setIsFetching(false);
    };

    fetchProducts();
  }, []);

  let foundSearch = false;
  return (
    <div className="searchbar-section">
    <div className="searchbar">
      <input
        placeholder="Search"
        className="input"
        value={props.searchbar}
        onChange={(event) =>
          props.handleOnSearchbarChange(event.target.value)
        }
      />
      <div className="search-icon">
        <SearchIcon />
      </div>
    </div>
  </div>
  );
}
