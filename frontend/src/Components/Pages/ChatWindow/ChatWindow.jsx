import React from "react";
import Chat from "../Chat/Chat";
import UserList from "../Userlist/UserList";
import Navigation from "../../Navigation/Navigation";
import { Grid } from "@mui/material";
import ChatDetails from "../ChatDetails/ChatDetails";
import "./ChatWindow.css";

function ChatWindow() {
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
