import * as React from "react";
import "./StoreForm.css";
import apiClient from "../../services/apiClient";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

//input boxes
import TextField from "@mui/material/TextField";

import CircularProgress from "@mui/material/CircularProgress";

// add store page form
export default function StoreForm(props) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    location: "",
    zipcode: "",
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
      zipcode: form.zipcode,
      logo: form.logo,
      description: form.description,
    });
    if (error) {
      setErrors(error);
    }
    if (data) {
      setForm({
        name: "",
        location: "",
        zipcode: "",
        logo: "",
        description: "",
      });
      props.addStore(data.store);
      navigate("/store");
    }
    setIsLoading(false);
  };
  return (
    <div className="store-form">
      <hr style={{ transform: "translateY(60px)", width: "1530px" }}></hr>
      <h2>Add Store</h2>

      <form className="inputs">
        <div className="form-input">
          <TextField
            id="standard-basic"
            label="Store Name*"
            variant="standard"
            type="text"
            name="name"
            placeholder="Store Name"
            value={form.name}
            onChange={handleOnInputChange}
          />
          {/* <label for="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Store name"
            value={form.name}
            onChange={handleOnInputChange}
          /> */}
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-input">
          <TextField
            id="standard-basic"
            label="Store Location*"
            variant="standard"
            type="text"
            name="location"
            placeholder="Store location"
            value={form.location}
            onChange={handleOnInputChange}
          />
        
          {/* <label for="location">Location</label>
          <input
            type="text"
            name="location"
            placeholder="Store location"
            value={form.location}
            onChange={handleOnInputChange}
          /> */}
          {errors.location && <span className="error">{errors.location}</span>}
        </div>
        <div className="form-input">
        <TextField
            id="standard-basic"
            label="Store zipcode*"
            variant="standard"
            type="integer"
            name="zipcode"
            placeholder="Store zipcode"
            value={form.zipcode}
            onChange={handleOnInputChange}
          />
        </div>
        <div className="split-form-input">
          <div className="form-input">
            <TextField
              id="standard-basic"
              label="Description*"
              variant="standard"
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleOnInputChange}
            />
            {/* <label for="description">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleOnInputChange}
            /> */}
            {errors.description && (
              <span className="error">{errors.description}</span>
            )}
          </div>
          <div className="form-input">
            <TextField
              id="standard-basic"
              label="Logo*"
              variant="standard"
              type="text"
              name="logo"
              placeholder="Logo URL"
              value={form.logo}
              onChange={handleOnInputChange}
            />
            {/* <label for="logo">Logo</label>
            <input
              type="text"
              name="logo"
              placeholder="logo url"
              value={form.logo}
              onChange={handleOnInputChange}
            /> */}
            {errors.logo && <span className="error">{errors.logo}</span>}
          </div>
        </div>
      </form>

      <button
        className="save-btn"
        disabled={isLoading}
        onClick={handleOnSubmit}
      >
        {isLoading ? <CircularProgress color="secondary" /> : "Save"}
      </button>
    </div>
  );
}
