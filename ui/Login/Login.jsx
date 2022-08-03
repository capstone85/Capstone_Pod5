import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import apiClient from "../../ui/src/services/apiClient";
import "./Login.css";
import { relativeTimeRounding } from "moment";
import CircularProgress from "@mui/material/CircularProgress";

//styling input boxes
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Footer from "../src/components/Footer/Footer";
{
  /* <link href="http://fonts.cdnfonts.com/css/recoleta" rel="stylesheet"></link>; */
}
export default function Login(props) {
  //input boxes
  //password visibility
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  //-----------------------------------

  const navigate = useNavigate();
  const [isLoading, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

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
    props.setIsLoggedIn(true);

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
      <div className="card">
        <h2>LOG IN</h2>
        <p>To access your account</p>
        {Boolean(errors.form) && <span className="error">{errors.form}</span>}
        <br />
        <div className="form">
          <div className="input-field">
            {/* email address input form */}
            <TextField
              id="standard-basic"
              label="*Email Address"
              variant="standard"
              type="email"
              name="email"
              placeholder="user@email.com"
              value={form.email}
              onChange={handleOnInputChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-field">
            {/* password input form */}
            <TextField
              id="standard-basic"
              label="*Password"
              variant="standard"
              type={passwordShown ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {/* visibility button for password */}
            <div className="visibilityButton">
              <button onClick={togglePassword}>
                {passwordShown ? (
                  <Visibility></Visibility>
                ) : (
                  <VisibilityOff></VisibilityOff>
                )}
              </button>
            </div>

            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          {/* forgot password sentence link */}
          <div className="forgotPassword">
            <Link to="/forgetPassword">
              <p>I forgot my password</p>
            </Link>
          </div>

          {/* sign in button */}
          <button
            className="btn"
            disabled={isLoading}
            onClick={
              handleOnSubmit
              // refreshPage();
            }
          >
            {/* circular loading icon that should appear when user is waiting after clicking the button */}
            {isLoading ? <CircularProgress color="secondary" /> : "SIGN IN"}
          </button>
        </div>

        {/* don't have an account portion of the page */}

        <div className="account-container">
          <h3>DON'T HAVE AN ACCOUNT?</h3>
          <Link to="/register">
            <p>CREATE AN ACCOUNT</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
