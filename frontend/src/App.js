import { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import AppController from './Components/ApplicationWindow/AppController'
import { ThemeProvider } from '@mui/material/styles';
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

  useEffect(() => {
    const userToken = Cookies.get('token')
    if (userToken) {
      console.log(userToken)
      axios.get('http://localhost:4000/api/v1/getUser')
        .then((({ data }) => { setUser(data); login(); console.log(data) })).catch(err => { console.log(err) })
    }

  }, [])

  const logout = async () => {
    await axios.get('http://localhost:4000/api/v1/logout').then((data) => { console.log(data.data); Cookies.remove('token'); setLogIn(false); setUser(null) }).catch((error => { console.log(error.response.status, error.response.data); }))

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
