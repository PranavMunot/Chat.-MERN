import { Button } from '@mui/material'
import React,{useContext} from 'react'
import {Link} from 'react-router-dom'
import LoginContext from '../../State/loginContext/LoginContext'
import './navigation.css'

function Navigation() {

    const auth = useContext(LoginContext)
  return (
    <div>
        <nav className='navigation'>
            <span className='logo'>
                <h2>Chat.</h2>
            </span>
            <span>
                {auth.isAuthenticated?auth.user.user.name:(<Link to='/auth'><Button variant='outlined'>Login</Button></Link>)}
            </span>
        </nav>
    </div>
  )
}

export default Navigation