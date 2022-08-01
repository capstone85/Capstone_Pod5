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
    logo: "",
    description: "",
  });
  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };
  const handleOnSubmit = async (s) => {
    s.preventDefault();
    setIsLoading(true);
    const { data, error } = await apiClient.createStore({
      name: form.name,
      location: form.location,
      logo: form.logo,
      description: form.description,
    });
    if (error) {
      setErrors(error);
    }
    if (data) {
      setForm({ name: "", location: "", logo: "", description: "" });
      props.addStore(data.store);
      navigate("/store");
    }
    setIsLoading(false);
  };
  return (
    <div className="store-form">
      <h2>Add Store</h2>
      <hr></hr>
      <form className="inputs">
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
          {errors.location && <span className="error">{errors.location}</span>}
        </div>
        <div className="split-form-input">
          <div className="form-input">
            <label for="description">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
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
