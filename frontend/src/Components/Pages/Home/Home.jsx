import React,{useContext} from 'react'
import LoginContext from '../../../State/loginContext/LoginContext'
import {Link} from 'react-router-dom'
import Navigation from '../../Navigation/Navigation'

function Home() {

  const auth = useContext(LoginContext)

  return (
    <div>
      <Navigation />
      {!auth.isAuthenticated?'Not Logged In':(<Link to={'/chat/:123'}><p>To User Page</p></Link>)}
    </div>
  )
}

export default Home