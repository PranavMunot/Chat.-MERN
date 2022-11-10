import React,{useState} from 'react'
import {Box, Button, TextField, Typography} from '@mui/material'
import './Authenticate.css'
import axios from 'axios'
import LoginContext from '../../State/loginContext/LoginContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'



function Authenticate() {

    const Login = ()=>{

      const navigate = useNavigate()
      
      const [Email,setEmail] = useState('')
      const [Password,setPassword] = useState('')

      const auth = useContext(LoginContext)
      
      const LoginHandler = async(e)=>{
        await axios.post('http://localhost:4000/api/v1/login',{
          email:Email,
          password:Password
        }).then((data)=>{auth.setUser(data.data)}).catch(error=>{
          console.log(error)
        })
        // auth.user = user
        auth.login()
        navigate('/')
      }

      const changeHandler = (e) =>{
        if(e.target.name === 'email'){
          setEmail(e.target.value)
          console.log(Email)
        }else{
          setPassword(e.target.value)
          console.log(Password)
        }
        
      }

        return(
            <Box className='LoginBox'>
              <form>
                <label for='userNameInput'>
                  <Typography sx={{my:0.5}} variant="body1">Email</Typography>
                </label>
                <TextField 
                  size='small' 
                  id='userNameInput' 
                  fullWidth 
                  variant="outlined" 
                  onChange={changeHandler}
                  name='email'
                  value={Email}  
                />
                <label for='passwordInput'>
                  <Typography sx={{my:0.5}} variant="body1">Password</Typography>
                </label>
                <TextField 
                  type="password" 
                  size='small' 
                  id='passwordInput' 
                  fullWidth 
                  variant="outlined" 
                  onChange={changeHandler}
                  name='password'
                  value={Password}  
                />
                <Box>

                </Box>
                <Button fullWidth sx={{mt:2}} onClick={LoginHandler} variant="contained">Login</Button>
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