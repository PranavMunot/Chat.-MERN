import React from 'react'
import {Box, Button, TextField, Typography} from '@mui/material'
import './Authenticate.css'



function Authenticate() {

    const Login = ()=>{
        return(
            <Box className='LoginBox'>
              <form>
                <label for='userNameInput'>
                  <Typography sx={{my:0.5}} variant="body1">Email</Typography>
                </label>
                <TextField size='small' id='userNameInput' fullWidth variant="outlined" />
                <label for='passwordInput'>
                  <Typography sx={{my:0.5}} variant="body1">Password</Typography>
                </label>
                <TextField type="password" size='small' id='passwordInput' fullWidth variant="outlined" />
                <Box>

                </Box>
                <Button fullWidth sx={{mt:2}} variant="contained">Login</Button>
                <Button fullWidth variant="text" disableRipple={true}>New to Chat.? Sign Up</Button>
                </form>
            </Box>
        )
    }

    const Signup = ()=>{}







  return (
    <div className='AuthBox'>
    {true?(<Login/>):(<Signup/>)}
    </div>
  )
}

export default Authenticate