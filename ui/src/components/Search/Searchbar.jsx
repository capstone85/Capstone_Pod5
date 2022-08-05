import "./Searchbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";

export default function Searchbar(props) {
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
      <div className="product-grid">
      {product.map((item, idx) => {
        if (
          item.name.toLowerCase().includes(props.searchbar.toLowerCase()) ||
          item.category.toLowerCase().includes(props.searchbar.toLowerCase())
        ) {
          foundSearch = true;
          return (
            <ProductCard
              key={idx}
              category={item.category}
              description={item.description}
              // showDescription={false}
              image={item.image}
              name={item.name}
              price={item.price}
              // storeId={curr.id}
              // products={props.products}
              // quantity={quantity}
              //  addToCart={() => addToCart(product)}
              addToCart={props.handleAddItemToCart}
              handleRemoveItemFromCart={props.handleRemoveItemFromCart}
              setIsFetching={props.setIsFetching}
              product={item}
            />
          );
        }
      })}
      {!foundSearch ? (
        <div className="none-found">
          <h1>No products available.</h1>
        </div>
      ) : null}
      </div>
    </div>
  );
}
