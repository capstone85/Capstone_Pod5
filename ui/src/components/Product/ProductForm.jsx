import * as React from "react";
import apiClient from "../../services/apiClient";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductForm(props) {
  let { storeId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });
  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };
  const handleOnSubmit = async (s) => {
    s.preventDefault();
    setIsLoading(true);
    const { data, error } = await apiClient.createProduct({
      name: form.name,
      description: form.description,
      price: form.price,
      image: form.price,
      category: form.category,
      store_id: storeId,
    });
    console.log("this is form name: ", form.name);
    console.log("this is store id", storeId);
    if (error) {
      setErrors(error);
    }
    if (data) {
      setForm({
        name: "",
        description: "",
        price: "",
        image: "",
        category: "",
      });
      props.addProduct(data.product);
      navigate("/store-page");
    }
    setIsLoading(false);
  };
  return (
    <div className="product-form">
      <h2>Add Merchandise</h2>
      <hr></hr>
      <form className="inputs">
        <div className="form-input">
          <label for="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleOnInputChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-input">
          <label for="description">Description</label>
          <input
            type="text"
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleOnInputChange}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>
        <div className="form-input">
          <label for="price">Price</label>
          <input
            type="text"
            name="price"
            placeholder="price"
            value={form.price}
            onChange={handleOnInputChange}
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>
        <div className="form-input">
          <label for="image">Image</label>
          <input
            type="text"
            name="image"
            placeholder="image url"
            value={form.image}
            onChange={handleOnInputChange}
          />
          {errors.image && <span className="error">{errors.image}</span>}
        </div>
        <div className="form-input">
          <label for="category">Category</label>
          <input
            type="text"
            name="category"
            placeholder="category"
            value={form.category}
            onChange={handleOnInputChange}
          />
          {errors.category && <span className="error">{errors.category}</span>}
        </div>
      </form>
      <button
        className="save-btn"
        disabled={isLoading}
        onClick={handleOnSubmit}
      >
        {isLoading ? "Loading..." : "Save"}
      </button>
    </div>
  );
}
