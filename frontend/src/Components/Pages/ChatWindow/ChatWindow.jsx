import React, { useContext, useEffect } from "react";
import Chat from "../Chat/Chat";
import UserList from "../Userlist/UserList";
import Navigation from "../../Navigation/Navigation";
import { Grid } from "@mui/material";
import ChatDetails from "../ChatDetails/ChatDetails";
import "./ChatWindow.css";
import LoginContext from '../../../State/loginContext/LoginContext'
import socket from "../../../Sockets/SocketInit";
import { Provider } from "react-redux";
import store from '../../../State/Redux/Store'

function ChatWindow() {

  const auth = useContext(LoginContext)

  useEffect(() => {
    socket.emit('online-user', { userId: auth.user.user.chatCode })
  }, [])

  return (
    <>
      <Provider store={store}>
        <Navigation />
        <Grid container className="gridWindow">
          <Grid sx={{ height: "100%" }} item md={3}>
            <UserList />
          </Grid>
          <Grid item md={6}>
            <Chat />
          </Grid>
          <Grid item md={3}>
            <ChatDetails />
          </Grid>
        </Grid>
      </Provider>
    </>
  );
}

export default ChatWindow;
