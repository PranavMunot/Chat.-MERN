import React, { useState, useContext, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import "./Authenticate.css";
import axios from "axios";
import LoginContext from "../../State/loginContext/LoginContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Authenticate() {
  const Login = () => {
    const navigate = useNavigate();

    const [Email, setEmail] = useState("");
    const [Error, setError] = useState([false, ""]);
    const [Password, setPassword] = useState("");

    const auth = useContext(LoginContext);

    const LoginHandler = async (e) => {
      await axios
        .post("http://localhost:4000/api/v1/login", {
          email: Email,
          password: Password,
        })
        .then(({ data }) => {
          auth.setUser(data);
          auth.login();
          Cookies.set("token", data.token, { expires: 1, secure: true });
          navigate("/");
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.status, error.response.data);
            setError([!Error[0], error.response.data.message]);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          setEmail("");
          setPassword("");
        });
    };

    const checkValidity = () => {
      // console.log(Email, Password);
    };

    const changeHandler = (e) => {
      if (e.target.name === "email") {
        setEmail(e.target.value);
        if (Error[0]) {
          setError([!Error[0], ""]);
        }
      } else {
        setPassword(e.target.value);
      }
      checkValidity();
    };

    return (
      <Box className="LoginBox">
        <form>
          <label htmlFor="userNameInput">
            <Typography sx={{ my: 0.5 }} variant="body1">
              Email
            </Typography>
          </label>
          <TextField
            size="small"
            id="userNameInput"
            fullWidth
            variant="outlined"
            onChange={changeHandler}
            name="email"
            value={Email}
          />
          <label htmlFor="passwordInput">
            <Typography sx={{ my: 0.5 }} variant="body1">
              Password
            </Typography>
          </label>
          <TextField
            type="password"
            size="small"
            id="passwordInput"
            error={Error[0]}
            helperText={Error[0] ? Error[1] : null}
            fullWidth
            variant="outlined"
            onChange={changeHandler}
            name="password"
            value={Password}
          />
          <Box></Box>
          <Button
            fullWidth
            sx={{ mt: 2 }}
            onClick={LoginHandler}
            variant="contained"
          // disabled={allData}
          >
            Login
          </Button>
          <Button fullWidth variant="text" disableRipple={true}>
            New to Chat.? Sign Up
          </Button>
        </form>
      </Box>
    );
  };

  const Signup = () => { };

  return <div className="AuthBox">{true ? <Login /> : <Signup />}</div>;
}

export default Authenticate;
