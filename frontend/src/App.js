import { useState } from 'react'
import { Container } from '@mui/material'
import AppWindow from './Components/ApplicationWindow/AppWindow'
import Authenticate from './Components/UserAuthentication/Authenticate';
import { ThemeProvider } from '@mui/material/styles';
import { TypographyTheme } from './Utils/TypographyTheme';
import './App.css';

function App() {

  const [isLoggedIn] = useState(false)

  return (
    <>
      <ThemeProvider theme={TypographyTheme}>
        <Container className="App">
          {isLoggedIn ? (<AppWindow />) : (<Authenticate />)}
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
