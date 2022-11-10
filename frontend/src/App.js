import { useState } from 'react'
import { Container } from '@mui/material'
import AppController from './Components/ApplicationWindow/AppController'
import { ThemeProvider } from '@mui/material/styles';
import { TypographyTheme } from './Utils/TypographyTheme';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginContext from './State/loginContext/LoginContext';

function App() {
  const [user, setUser] = useState({})
  const [isLoggedIn, setLogIn] = useState(false)
  const login = () => {
    setLogIn(true)
  }
  const logout = () => {
    setLogIn(false)
    setUser(null)
  }

  return (
    <>
      <ThemeProvider theme={TypographyTheme}>
        <Container className="App">
          <Router>
            <LoginContext.Provider value={{ isAuthenticated: isLoggedIn, user, setUser, login: login, logout: logout }}>
              <AppController />
            </LoginContext.Provider>
          </Router>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
