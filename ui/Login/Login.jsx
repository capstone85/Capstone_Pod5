import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import apiClient from "../../ui/src/services/apiClient";
//import { useAuthContext } from "../context/auth";
//import MedicalResearch from "../MedicalResearch/MedicalResearch"
// import undraw_medical_research from "../../assets/undraw_medical_research_deep_blue.svg"
import "./Login.css";

export default function Login(props) {
  const navigate = useNavigate();
  const [isLoading, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   console.log(props.user);
  // }, [props.user]);
  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));
    const toSend = {
      category: form.category,
      email: form.email,
      first_name: form.firstName,
      last_name: form.lastName,
      password: form.password,
    };
    //console.log(toSend);
    const { data, error } = await apiClient.loginUser(toSend);
    //console.log(data);
    //console.log(error);
    if (error) {
      setErrors((e) => ({ ...e, form: error }));
    }
    if (data?.user) {
      apiClient.setToken(data.token);
      //console.log("data", data);
      props.setUser(data.user);
      // navigate("/");
      //console.log("user", props.user);
      //console.log("category", props.user.category);
      if (data.user.category === "shopper") {
        navigate("/");
      } else if (data.user.category === "vendor") {
        navigate("/store");
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="Login">
      <div className="media">
        {/* <img src={undraw_medical_research} alt="medical research" /> */}
      </div>

      <div className="card">
        <h2>Login to the Portal</h2>

        {Boolean(errors.form) && <span className="error">{errors.form}</span>}
        <br />

        <div className="form">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="user@gmail.com"
              value={form.email}
              onChange={handleOnInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <button className="btn" disabled={isLoading} onClick={handleOnSubmit}>
            {isLoading ? "Loading..." : "Login"}
          </button>
        </div>

        <div className="footer">
          <p>
            Don't have an account? Sign up <Link to="/register">here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
