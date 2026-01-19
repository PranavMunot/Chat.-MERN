import useAuth from '../../State/loginContext/LoginContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import Authenticate from '../UserAuthentication/Authenticate'
import Home from '../Pages/Home/Home'
import ChatWindow from '../Pages/ChatWindow/ChatWindow'
import { Provider } from "react-redux";
import store from '../../State/Redux/Store'
import UserSetting from '../Pages/UserSettings/UserSetting'
import { SocketProvider } from '../../Sockets/useSocket'


function AppController() {

  const { isAuthenticated } = useAuth()



  if (isAuthenticated) {
    return (
      <>
        <Provider store={store}>
          <SocketProvider>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/chat' element={<ChatWindow />} />
              <Route path='/profile' element={<UserSetting />} />
              <Route path='*' element={<Navigate to={'/'} />} />
            </Routes>
          </SocketProvider>
        </Provider>
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