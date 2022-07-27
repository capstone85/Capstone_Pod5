import * as React from "react";
// import "./ExerciseForm.css";
import apiClient from "../../services/apiClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StoreForm(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    logo: "",
  });
  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await apiClient.createStore({
      name: form.name,
      location: form.location,
      description: form.description,
      logo: form.logo,
    });
    if (error) {
      setErrors(error);
    }
    if (data) {
      setForm({ name: "", location: "", description: "", logo: "" });
      props.addstore(data.store);
      navigate("/store");
    }
    setIsLoading(false);
  };
  return (
    <div className="store-form">
      <div className="container">
        <h2>Add Store</h2>
        <br />
        <div className="inputs">
          <div className="form-input">
            <label for="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Store name"
              value={form.name}
              onChange={handleOnInputChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-input">
            <label for="location">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Store location"
              value={form.location}
              onChange={handleOnInputChange}
            />
            {errors.location && (
              <span className="error">{errors.location}</span>
            )}
          </div>
          <div className="split-form-input">
            <div className="form-input">
              <label for="description">Description</label>
              <input
                type="text"
                name="description"
                placeholder="description"
                value={form.description}
                onChange={handleOnInputChange}
              />
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </div>
            <div className="form-input">
              <label for="logo">Logo</label>
              <input
                type="text"
                name="logo"
                placeholder="logo url"
                value={form.logo}
                onChange={handleOnInputChange}
              />
              {errors.logo && <span className="error">{errors.logo}</span>}
            </div>
          </div>
        </div>
        <button
          className="save-btn"
          disabled={isLoading}
          onClick={handleOnSubmit}
        >
          {isLoading ? "Loading..." : "Save"}
        </button>
      </div>
    </div>
  );
}
