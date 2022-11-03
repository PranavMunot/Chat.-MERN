import { useState } from 'react'
import { Container } from '@mui/material'
import AppWindow from './Components/ApplicationWindow/AppWindow'
import Authenticate from './Components/UserAuthentication/Authenticate';
import './App.css';

function App() {

  const [isLoggedIn, setLoggedStatus] = useState(false)

  return (
    <>
      <Container className="App">
        {isLoggedIn ? (<AppWindow />) : (<Authenticate />)}
      </Container>
    </>
  );
}

export default App;
