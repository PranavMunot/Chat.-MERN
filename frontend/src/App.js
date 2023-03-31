import { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import AppController from './Components/ApplicationWindow/AppController'
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginContext from './State/loginContext/LoginContext';
import lightTheme from './Utils/LightTheme';
import { axiosInstance } from './api/axios'
import Cookies from 'js-cookie';
import socket from './Sockets/SocketInit'
import { Box, CircularProgress, Snackbar, useMediaQuery, Typography } from '@mui/material'
import Navigation from './Components/Navigation/Navigation';


function App() {
  const [user, setUser] = useState({})
  const [isLoggedIn, setLogIn] = useState(false)
  const [isUserLoading, setUserLoading] = useState(true);
  const [isDuplicate, setIsDuplicate] = useState(false)

  const isSmallScreen = useMediaQuery('(max-width:1000px)')

  const login = () => {
    setLogIn(true)
  }

  const logout = async () => {
    await axiosInstance.get('/logout')
      .then((data) => {
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
      axiosInstance.get('/getUser')
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
                    (
                      <>
                        {isSmallScreen ? (
                          <Box sx={{ width: '100%', height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <h2>Chat.</h2>
                            <Typography textAlign={'center'}>
                              Please use bigger screen for better viewing experience
                            </Typography>
                          </Box>
                        ) : (< AppController />)
                        }
                      </>
                    )
                  }
                </>
              )
                :
                <h1>Duplicate Tab close this</h1>}
            </LoginContext.Provider>
          </Router>
        </Container>
      </ThemeProvider >
    </>
  );
}

export default App;
