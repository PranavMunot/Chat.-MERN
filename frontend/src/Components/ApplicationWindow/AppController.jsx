import React, { useContext } from 'react'
import LoginContext from '../../State/loginContext/LoginContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import Authenticate from '../UserAuthentication/Authenticate'
import Home from '../Pages/Home/Home'
import ChatWindow from '../Pages/ChatWindow/ChatWindow'

function AppController() {

  const auth = useContext(LoginContext)



  if (auth.isAuthenticated) {
    return (
      <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat/:id' element={<ChatWindow />} />
          <Route path='*' element={<Navigate to={'/'} />} />
        </Routes>
      </>
    )
  }
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Authenticate />} />
        <Route path='*' element={<Navigate to={'/auth'} />} />
      </Routes>
    </>
  )
}

export default AppController