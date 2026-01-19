import { useState } from 'react'
import { Container } from '@mui/material'
import AppController from './Components/ApplicationWindow/AppController'
import { ThemeProvider } from '@mui/material/styles';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './State/loginContext/LoginContext';
import lightTheme from './Utils/LightTheme';
import { useMediaQuery } from '@mui/material';


function App() {

  const [isDuplicate, setIsDuplicate] = useState(false)
  const isSmallScreen = useMediaQuery('(max-width:1000px)')

  // useEffect(() => {
  //   socket.on('duplicate-tab', () => {
  //     console.log('this is duplicate tab')
  //     setIsDuplicate(true)
  //   })
  // })

  return (
    <>
      <ThemeProvider theme={lightTheme}>
        <Container className="App">
          <Router>
            <AuthProvider>
              {!isDuplicate ? (
                <>
                  < AppController />
                  {/* {isSmallScreen ? (
                    <Box sx={{ width: '100%', height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                      <h2>Chat.</h2>
                      <Typography textAlign={'center'}>
                        Please use bigger screen for better viewing experience
                      </Typography>
                    </Box>
                  ) : (< AppController />)} */}
                </>
              )
                :
                <h1>Duplicate Tab close this</h1>
              }
            </AuthProvider>
          </Router>
        </Container>
      </ThemeProvider >
    </>
  );
}

export default App;
