import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";
import apiClient from "../src/services/apiClient";

export default function SignUp(props) {
  useEffect(() => {
    console.log(props.user);
  }, [props.user]);
  const navigate = useNavigate();
  const [isLoading, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    category: "",
    password: "",
    passwordConfirm: "",
  });

  // function change(src) {
  //   window.location = src;
  // }
  const handleOnInputChange = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Passwords do not match.",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Passwords do not match.",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      setIsProcessing(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    const { data, error } = await apiClient.signUpUser({
      email: form.email,
      first_name: form.firstName,
      last_name: form.lastName,
      category: form.category,
      password: form.password,
    });
    if (error) {
      setErrors((e) => ({ ...e, form: error }));
    }
    if (data?.user) {
      props.setUser(data.user);
      apiClient.setToken(data.user.token);
      if (form.category == "Shopper") {
        navigate("/");
      } else {
        navigate("/store");
      }
    }
    setIsProcessing(false);
  };

  return (
    <div className="Register">
      <div className="card">
        <h2>Register</h2>

        {errors.form && <span className="error">{errors.form}</span>}
        <br />

        <div className="form">
          {/* <div>
            <label htmlFor="category">I am a...</label>
            <select
              name="category"
              id="category"
              onChange={(e) => change(e.target.value)}
            >
              <option value="/">Shopper</option>
              <option value="/vendorsignup">Vendor</option>
            </select>
          </div> */}
          <div className="split-inputs">
            <div className="input-field">
              <label htmlFor="category">I am a...</label>
              {/* <input
                type="category"
                name="category"
                placeholder="input category"
                value={form.category}
                onChange={handleOnInputChange}
              /> */}
              <select name="category" type="category">
                <option value={(form.category = "Shopper")}>Shopper</option>
                <option value={(form.category = "Vendor")}>Vendor</option>
              </select>
              {errors.category && (
                <span className="error">{errors.category}</span>
              )}
            </div>

            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="email@email.com"
                value={form.email}
                onChange={handleOnInputChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            {/* 
            <div className="input-field">
              <label htmlFor="email">username</label>
              <input
                type="text"
                name="username"
                placeholder="your_username"
                value={form.username}
                onChange={handleOnInputChange}
              />
              {errors.username && (
                <span className="error">{errors.username}</span>
              )}
            </div> */}

            <div className="split-inputs">
              <div className="input-field">
                <label htmlFor="name">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Jane"
                  value={form.firstName}
                  onChange={handleOnInputChange}
                />
                {errors.firstName && (
                  <span className="error">{errors.firstName}</span>
                )}
              </div>
              <div className="input-field">
                <label htmlFor="name">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={handleOnInputChange}
                />
                {errors.lastName && (
                  <span className="error">{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={form.password}
                onChange={handleOnInputChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>

            <div className="input-field">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type="password"
                name="passwordConfirm"
                placeholder="confirm password"
                value={form.passwordConfirm}
                onChange={handleOnInputChange}
              />
              {errors.passwordConfirm && (
                <span className="error">{errors.passwordConfirm}</span>
              )}
            </div>

            <button
              className="btn"
              disabled={isLoading}
              onClick={handleOnSubmit}
            >
              {isLoading ? "Loading..." : "Create Account"}
            </button>
          </div>

          <div className="footer">
            <p>
              Already have an account? Login <Link to="/login">here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
