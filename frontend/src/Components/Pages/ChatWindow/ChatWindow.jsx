import React from "react";
import Chat from "../Chat/Chat";
import Setting from "../Settings/Setting";
import UserList from "../Userlist/UserList";
import Navigation from "../../Navigation/Navigation";
import { Divider, Grid } from "@mui/material";
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
          {/* <Setting /> */}
        </Grid>
      </Grid>
    </>
  );
}

export default ChatWindow;
