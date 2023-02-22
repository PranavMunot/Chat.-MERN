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
import socket from './Sockets/SocketInit'
import { Box, CircularProgress } from '@mui/material'


function App() {
  const [user, setUser] = useState({})
  const [isLoggedIn, setLogIn] = useState(false)
  const [isUserLoading, setUserLoading] = useState(true);
  const [isDuplicate, setIsDuplicate] = useState(false)

  const login = () => {
    setLogIn(true)
  }

  const logout = async () => {
    await axios.get('http://localhost:4000/api/v1/logout')
      .then((data) => {
        // console.log(data.data); 
        Cookies.remove('token');

        setLogIn(false);
        setUser(null)
      })
      .catch((error => {
        console.log(error.response.status, error.response.data);
      }))
  }

  useEffect(() => {
    socket.on('duplicate-tab', () => {
      console.log('this is duplicate tab')
      setIsDuplicate(true)
    })
  })

  useEffect(() => {
    const userToken = Cookies.get('token')
    if (userToken) {
      axios.get('http://localhost:4000/api/v1/getUser')
        .then(
          ({ data }) => {
            setUser(data);
            login();
            setUserLoading(false)
            socket.emit('clientConnect', { message: `Connection successful from ${socket.id}`, user: data.user })
          }
        ).catch(err => { console.log(err); setUserLoading(false) })
    }
    else {
      setUserLoading(false)
    }
  }, [])


  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Container className="App">
          <Router>
            <LoginContext.Provider value={{ isAuthenticated: isLoggedIn, user, setUser, login: login, logout: logout }}>
              {!isDuplicate ? (
                <>
                  {isUserLoading ?
                    <Box sx={{ display: 'flex', width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
                      <CircularProgress color='primary' />
                    </Box>
                    :
                    <AppController />}
                </>
              )
                :
                <h1>Duplicate Tab close this</h1>}
            </LoginContext.Provider>
          </Router>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
