import { useState, useRef } from "react";
import { Box, Button, TextField, InputAdornment, Typography, IconButton, CircularProgress } from "@mui/material";
import "./Authenticate.css";
import useAuth from "../../State/loginContext/LoginContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'

const Login = () => {
  const navigate = useNavigate();

  const [Email, setEmail] = useState("");
  const [Error, setError] = useState([false, ""]);
  const [Password, setPassword] = useState("");
  const [isApiLoading, setApiLoading] = useState(false)
  const [isPasswordVisible, setPasswordVisible] = useState(true)

  const auth = useAuth();

  const LoginHandler = async (e) => {
    try {
      if (Email.trim() === '' || Password.trim() === '') {
        setError([true, 'Please fill all the fields'])
        return null
      }
      if (!Email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+(\.\w{2,3})+$/)) {
        setError([true, 'Please enter a valid Email'])
        return null
      }
      if (Password.trim().length < 6 || Password.trim().length > 16) {
        setError([true, 'Password should be between 6 to 16 characters'])
        return null
      }
      setApiLoading(true)
      await auth.login({
        email: Email,
        password: Password,
      }).then((data) => {
        if (data) {
          setEmail("");
          setPassword("");
          navigate('/')
        }
      })
    } catch (error) {
      if (error.response) {
        console.error("Error", error.response.status, error.response.data);
        setError([true, error.response.data.message]);
      } else if (error.request) {
        console.error("Error", error.request);
      } else {
        console.error("Error", error.message);
        setError([true, error.message]);
      }
      setEmail("");
      setPassword("");
    } finally {
      setApiLoading(false);
    }
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

          fullWidth
          variant="outlined"
          name="password"
          value={Password}
          onChange={changeHandler}
          InputProps={{
            endAdornment: <InputAdornment style={{ color: '#103783', fontSize: '1rem', margin: 'auto', cursor: 'pointer', textAlign: 'center' }} onClick={() => { setPasswordVisible(!isPasswordVisible) }} position="start">{isPasswordVisible ? <AiOutlineEyeInvisible /> : < AiOutlineEye />}</InputAdornment>,
          }}

        />
        {Error[0] ? <Box>
          <Typography variant="caption" color={'error'}>{Error[1]}</Typography>
        </Box> : null}
        <Button
          fullWidth
          sx={{ mt: 2 }}
          onClick={LoginHandler}
          variant="contained"
          disabled={isApiLoading}
        >
          {isApiLoading ? <CircularProgress size={'1.4rem'} sx={{ my: 0.5 }} /> : 'Login'}
        </Button>

      </form>
    </Box>
  );
};


const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [isPasswordVisible, setPasswordVisible] = useState(true)
  const [isApiLoading, setApiLoading] = useState(false)
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
    e.preventDefault();
    try {
      if (email.trim() === '' || password.trim() === '') {
        setError([true, 'Please fill all the fields'])
        return null
      }
      if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+(\.\w{2,3})+$/)) {
        setError([true, 'Please enter a valid Email'])
        return null
      }
      if (password.trim().length < 6 || password.trim().length > 16) {
        setError([true, 'Password should be between 6 to 16 characters'])
        return null
      }
      setApiLoading(true);
      await auth.signUp({
        name: name,
        email: email,
        password: password,
        profilePhoto: profilePhoto,
      }).then((data) => {
        if (data) {
          setEmail("");
          setPassword("");
          setName('');
          profilePhotoHandler();
          navigate("/");
        }
      })
    } catch (error) {
      if (error.response) {
        console.log(error.response.status, error.response.data);
        setError([true, error.response.data.message]);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    } finally {
      setApiLoading(false)
    }

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

        {Error[0] ? <Box>
          <Typography variant="caption" color={'error'}>{Error[1]}</Typography>
        </Box> : null}

        <Button
          fullWidth
          sx={{ mt: 2 }}
          variant="contained"
          type="submit"
          disabled={isApiLoading}
        >
          {isApiLoading ? <CircularProgress size={'1.4rem'} sx={{ my: 0.5 }} /> : 'Signup'}
        </Button>
      </Box>
    </form>
  )
};



function Authenticate() {

  const [isLoginPage, setLoginPage] = useState(true)


  return (

    <div className="AuthBox">
      <Typography variant="h2" fontSize={'5rem'} sx={{ pb: 2 }} textAlign={'start'} fontWeight={'400'}>Chat.</Typography>
      {isLoginPage ? <Login /> : <Signup />}
      <Button onClick={() => { setLoginPage(!isLoginPage) }} sx={{ textTransform: 'none', mt: 2 }} variant="text" disableRipple={true}>
        {isLoginPage ? `New to Chat.?` : `Already a Chat. User?`}
      </Button>
    </div>

  );
}

export default Authenticate;
