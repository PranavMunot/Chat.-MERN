import { useEffect } from "react";
import Chat from "../Chat/Chat";
import UserList from "../Userlist/UserList";
import Navigation from "../../Navigation/Navigation";
import { Grid } from "@mui/material";
import ChatDetails from "../ChatDetails/ChatDetails";
import "./ChatWindow.css";
import useAuth from '../../../State/loginContext/LoginContext'

import { useSocket } from '../../../Sockets/useSocket';

function ChatWindow() {

  const auth = useAuth()
  const { emit } = useSocket()

  // useEffect(() => {
  //   socket.on('reconnect', () => {
  //     console.log(`reC`)
  //   })
  // })

  useEffect(() => {
    emit('online-user', { userId: auth.user.user.chatCode })
  }, [auth.user.user.chatCode, emit])

  return (
    <>
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
    </>
  );
}

export default ChatWindow;
