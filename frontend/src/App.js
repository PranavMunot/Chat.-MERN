import { useState } from 'react'
import { Container } from '@mui/material'
import AppController from './Components/ApplicationWindow/AppController'
import { ThemeProvider } from '@mui/material/styles';
import { TypographyTheme } from './Utils/TypographyTheme';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginContext from './State/loginContext/LoginContext';
import lightTheme from './Utils/LightTheme';
import axios from 'axios'
import Cookies from 'js-cookie';

function App() {
  const [user, setUser] = useState({})
  const [isLoggedIn, setLogIn] = useState(false)
  const login = () => {
    setLogIn(true)
  }
  const logout = () => {
    axios.get('http://localhost:4000/api/v1/logout').then((data) => { console.log(data.data); Cookies.remove('token'); setLogIn(false); setUser(null) }).catch((error => { console.log(error.response.status, error.response.data); }))

  }

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        {/* <ThemeProvider theme={TypographyTheme}> */}
        <Container className="App">
          <Router>
            <LoginContext.Provider value={{ isAuthenticated: isLoggedIn, user, setUser, login: login, logout: logout }}>
              <AppController />
            </LoginContext.Provider>
          </Router>
        </Container>
      </ThemeProvider>
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
