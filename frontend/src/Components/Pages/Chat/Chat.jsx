import React from "react";
import "./Chat.css";
import image from "../../../TestImages/cld-sample-2.jpg";
import { IconButton, TextField, Typography } from "@mui/material";
import { IoSend } from "react-icons/io5";
import { CgSmileNeutral, CgSmileMouthOpen } from "react-icons/cg";
import MessageScreen from "./MessageScreen";
const emojis = require("emojis-list");

const ChatInfo = () => {
  return (
    <>
      <img src={image} className="chatInfoImage" alt="userImage" />
      <span className="chatInfoText">
        <Typography sx={{ lineHeight: 1 }} variant="body1" color="primary">
          User Name
        </Typography>
      </span>
    </>
  );
};

const MessageForm = () => {
  return (
    <>
      <IconButton size="medium">
        <CgSmileNeutral />
      </IconButton>
      <TextField
        placeholder="Type your message here!"
        variant="standard"
        maxRows={5}
        sx={{
          border: "none",
          display: "flex",
          justifyContent: "center",
          pl: 1,
          pb: 0,
        }}
        size="small"
        multiline
        fullWidth
        InputProps={{
          disableUnderline: true,
        }}
      />
      <IconButton size="medium" sx={{ ml: 1 }}>
        <IoSend className="icon" />
      </IconButton>
    </>
  );
};

function Chat() {
  return (
    <div className="chatGrid">
      <div className="chatInfo">
        <ChatInfo />
      </div>
      <div className="messageScreen">
        <MessageScreen />
      </div>
      <div className="messageForm">
        <MessageForm />
      </div>
    </div>
  );
}

export default Chat;
