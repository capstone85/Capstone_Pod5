import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";
import apiClient from "../src/services/apiClient";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "../src/components/Footer/Footer";

//styling input boxes
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

//dropdown input box
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SignUp(props) {
  //input boxes
  //password visibility
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  //-----------------------------------

  useEffect(() => {
    console.log(props.user);
  }, [props.user]);

  const navigate = useNavigate();

  const options = [
    { value: "shopper", text: "Shopper" },
    { value: "vendor", text: "Vendor" },
  ];
  const [isLoading, setIsProcessing] = useState(false);
  const [selected, setSelected] = useState("Shopper");
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    category: "shopper",
    password: "",
    passwordConfirm: "",
  });

  const handleOnInputChange = (event) => {
    if (event.target.name === "category") {
      console.log(event.target.value);
      setSelected(event.target.value);
    }

    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

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
      apiClient.setToken(data.token);
      if (form.category == "vendor") {
        navigate("/store");
      } else {
        navigate("/");
      }
    }
    setIsProcessing(false);
    props.setIsLoggedIn(true);
  };

  return (
    <div className="Register">
      <div className="card">
        <h2>YOUR ACCOUNT</h2>
        <p>Create an account</p>
        {errors.form && <span className="error">{errors.form}</span>}
        <br />

        <div className="form">
          <div className="split-inputs">
            <div className="input-field">
              {/* dropdown input for user type (shopper or vendor) */}
              <div className="dropdown-input">
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small">I am a</InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    name="category"
                    value={selected}
                    label="Category *"
                    onChange={handleOnInputChange}
                  >
                    <MenuItem value="shopper">Shopper</MenuItem>
                    <MenuItem value="vendor">Vendor</MenuItem>
                  </Select>
                </FormControl>
              </div>

              {errors.category && (
                <span className="error">{errors.category}</span>
              )}
            </div>

            {/* email input */}
            <div className="input-field">
              <TextField
                id="standard-basic"
                label="Email Address *"
                variant="standard"
                type="email"
                name="email"
                placeholder="user@email.com"
                value={form.email}
                onChange={handleOnInputChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="split-inputs">
              <div className="input-field">
                {/* First name input */}
                <TextField
                  id="standard-basic"
                  label="First Name *"
                  variant="standard"
                  type="firstName"
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
                {/* Last Name input */}
                <TextField
                  id="standard-basic"
                  label="Last Name *"
                  variant="standard"
                  type="lastName"
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
              {/* password input  */}
              <TextField
                id="standard-basic"
                label="Password *"
                variant="standard"
                type={passwordShown ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleOnInputChange}
              />
              {/* visibility button for password */}
              <div className="visibilityButton">
                <button
                  onClick={togglePassword}
                  style={{ background: "none", border: "none" }}
                >
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

            <div className="input-field">
              <div className="confirmPassword">
                <TextField
                  id="standard-basic"
                  label="Confirm Password *"
                  variant="standard"
                  type="password"
                  name="passwordConfirm"
                  placeholder="Comfirm Password"
                  value={form.passwordConfirm}
                  onChange={handleOnInputChange}
                />
                {/* visibility button for password */}
                {/* <div className="visibilityButton">
                  <button onClick={toggleConfirmPassword}>
                    {passwordShowConfirm ? (
                      <Visibility></Visibility>
                    ) : (
                      <VisibilityOff></VisibilityOff>
                    )}
                  </button>
                </div> */}
              </div>
              {errors.passwordConfirm && (
                <span className="error">{errors.passwordConfirm}</span>
              )}
            </div>

            <button
              className="btn"
              disabled={isLoading}
              onClick={handleOnSubmit}
            >
              {isLoading ? (
                <CircularProgress color="secondary" />
              ) : (
                "CREATE AN ACCOUNT"
              )}
            </button>
            <div className="bottomLinks">
              <h3>ALREADY HAVE AN ACCOUNT?</h3>
              <div className="loginHere">
                <Link to="/login">
                  <p>LOGIN HERE</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
