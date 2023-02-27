import React, { useState, useContext, useRef } from "react";
import { Box, Button, TextField, InputAdornment, Typography, IconButton } from "@mui/material";
import "./Authenticate.css";
import { axiosInstance } from "../../api/axios";
import LoginContext from "../../State/loginContext/LoginContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'

const Login = () => {
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Error, setError] = useState([false, ""]);
  const [Password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(true)

  const auth = useContext(LoginContext);

  const LoginHandler = async (e) => {
    await axiosInstance
      .post("/login", {
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
    // checkValidity();
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
          type={isPasswordVisible ? 'password' : 'text'}
          size="small"
          id="passwordInput"
          error={Error[0]}
          helperText={Error[0] ? Error[1] : null}
          fullWidth
          variant="outlined"
          name="password"
          value={Password}
          onChange={changeHandler}
          InputProps={{
            endAdornment: <InputAdornment style={{ color: '#103783', fontSize: '1rem', margin: 'auto', cursor: 'pointer', textAlign: 'center' }} onClick={() => { setPasswordVisible(!isPasswordVisible) }} position="start">{isPasswordVisible ? <AiOutlineEyeInvisible /> : < AiOutlineEye />}</InputAdornment>,
          }}

        />
        <Box></Box>
        <Button
          fullWidth
          sx={{ mt: 2 }}
          onClick={LoginHandler}
          variant="contained"
        >
          Login
        </Button>

      </form>
    </Box>
  );
};


function Authenticate() {

  const [isLoginPage, setLoginPage] = useState(true)


  const Signup = () => {
    const navigate = useNavigate();
    const auth = useContext(LoginContext);
    const [isPasswordVisible, setPasswordVisible] = useState(true)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profilePhoto, setProfilePhoto] = useState('')
    const [Error, setError] = useState([false, ""]);

    const profilePhotoRef = useRef(null)

    const profilePhotoHandler = () => {
      profilePhotoRef.current.value = null;
      setProfilePhoto('')
    }


    const SignupHandler = async (e) => {
      e.preventDefault()
      await axiosInstance
        .post("/signup", {
          name: name,
          email: email,
          password: password,
          profilePhoto: profilePhoto,
        }, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
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
          setName('');
          profilePhotoHandler()
        });
    };

    return (
      <form onSubmit={SignupHandler} method="POST" encType="multipart/form-data">
        <Box className="LoginBox">
          <label htmlFor="userNameInput">
            <Typography sx={{ my: 0.5 }} variant="body1">
              User Name
            </Typography>
          </label>
          <TextField
            size="small"
            id="userNameInput"
            fullWidth
            variant="outlined"
            name="name"
            required
            value={name}
            onChange={(event) => { setName(event.target.value) }}
          />
          <label htmlFor="emailInput">
            <Typography sx={{ my: 0.5 }} variant="body1">
              Email
            </Typography>
          </label>
          <TextField
            size="small"
            id="emailInput"
            fullWidth
            variant="outlined"
            name="email"
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />

          <label htmlFor="passwordInput">
            <Typography sx={{ my: 0.5 }} variant="body1">
              Password
            </Typography>
          </label>
          <TextField
            type={isPasswordVisible ? 'password' : 'text'}
            size="small"
            id="passwordInput"
            error={Error[0]}
            helperText={Error[0] ? Error[1] : null}
            fullWidth
            variant="outlined"
            name="password"
            required
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            InputProps={{
              endAdornment: <InputAdornment style={{ color: '#103783', fontSize: '1rem', margin: 'auto', cursor: 'pointer', textAlign: 'center' }} onClick={() => { setPasswordVisible(!isPasswordVisible) }} position="start">{isPasswordVisible ? <AiOutlineEyeInvisible /> : < AiOutlineEye />}</InputAdornment>,
            }}
          />

          <Typography sx={{ my: 0.5 }} variant="body1">
            Upload Avatar
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <input type='file' className="inputBtn" ref={profilePhotoRef} onChange={(e) => { setProfilePhoto(e.target.files[0]) }} />
            {profilePhoto && (<IconButton variant='button' onClick={profilePhotoHandler}><FiDelete /></IconButton>)}
          </Box>

          <Button
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
            type="submit"
          >
            Sign Up
          </Button>
        </Box>
      </form>
    )
  };

  return (
    <div className="AuthBox">{isLoginPage ? <Login /> : <Signup />}
      <Button onClick={() => { setLoginPage(!isLoginPage) }} sx={{ textTransform: 'none', mt: 2 }} variant="text" disableRipple={true}>
        {isLoginPage ? `New to Chat.?` : `Already a Chat. User?`}
      </Button>
    </div>
  );
}

export default Authenticate;
