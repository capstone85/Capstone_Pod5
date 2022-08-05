import * as React from "react";
import apiClient from "../../services/apiClient";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductForm.css";

import Footer from "../Footer/Footer";
import CircularProgress from "@mui/material/CircularProgress";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//styling input boxes
import TextField from "@mui/material/TextField";

export default function ProductForm(props) {
  let { storeId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [selected, setSelected] = useState("Footwear");
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });
  const handleOnInputChange = (event) => {
    if (event.target.name == "category") {
      console.log(event.target.value);
      setSelected(event.target.value);
    }
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };
  const handleOnSubmit = async (s) => {
    s.preventDefault();
    setIsLoading(true);
    const { data, error } = await apiClient.createProduct({
      name: form.name,
      description: form.description,
      price: form.price,
      image: form.image,
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
      <h1>MY PRODUCTS</h1>
      <hr style={{ transform: "translateY(60px)", width: "1530px" }}></hr>
      <h2>Add Merchandise</h2>

      <form className="inputs">
        <div className="form-input">
          <TextField
            id="standard-basic"
            label="Name*"
            variant="standard"
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleOnInputChange}
          />

          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-input">
          <TextField
            id="standard-basic"
            label="Description*"
            variant="standard"
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
          <AttachMoneyIcon
            style={{ transform: "translateY(22px) translateX(-20px)" }}
          ></AttachMoneyIcon>
          <TextField
            style={{ transform: "translateX(-23px)" }}
            id="standard-basic"
            label="Price*"
            variant="standard"
            type="text"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleOnInputChange}
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>
        <div className="form-input">
          <TextField
            id="standard-basic"
            label="Image*"
            variant="standard"
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleOnInputChange}
          />

          {errors.image && <span className="error">{errors.image}</span>}
        </div>
        <div className="form-input">
          <FormControl
            sx={{ m: 1, minWidth: 200 }}
            size="small"
            style={{ transform: "translateY(10px) translateX(-10px)" }}
          >
            <InputLabel id="demo-select-small">Category*</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              name="category"
              value={selected}
              label="Category"
              onChange={handleOnInputChange}
            >
              <MenuItem value="footwear">Footwear</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="accessories">Accessories</MenuItem>
            </Select>
          </FormControl>

          {errors.category && <span className="error">{errors.category}</span>}
        </div>
      </form>
      <button
        className="save-btn"
        disabled={isLoading}
        onClick={handleOnSubmit}
      >
        {isLoading ? <CircularProgress color="secondary" /> : "Save"}
      </button>
      {/* <Footer style={{ transform: "translateY(-500px)" }}></Footer> */}
    </div>
  );
}
