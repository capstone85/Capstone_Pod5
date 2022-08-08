import * as React from "react";
import "./SearchPage.css";
import SearchBar from "./Searchbar";
import Selector from "../Product/Filter";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import ProductCard from "../Product/ProductCard";

export default function SearchPage(props) {
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
  
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const categoriesList = [
    "All Categories",
    "clothing",
    "accessories",
    "footwear",
  ];

  const currentItems = product.filter((item) => {
    console.log(item.category);
    return item.category == activeCategory;
  });

  return (
    <>
      <h1 className="page-head">Search for stores or styles.</h1>
      <div className="searchbar">
        <SearchBar
          handleOnSearchbarChange={props.handleOnSearchbarChange}
          setSearchBar={props.setSearchbar}
          product={product}
        />
      </div>
      <div className="category">
        <ul className="categoryList">
          {categoriesList.map((category, idx) => (
            <Selector
              key={idx}
              category={category}
              isActive={activeCategory == category}
              onClick={() => {
                setActiveCategory(category);
              }}
            />
          ))}
        </ul>
      </div>
      <div className="product-gridSearch">
        {product.map((item, idx) => {
          {
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
    </>
  );
}
