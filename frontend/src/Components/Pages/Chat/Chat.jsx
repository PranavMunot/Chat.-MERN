import React from "react";
import "./Chat.css";
import image from "../../../TestImages/cld-sample-2.jpg";
import { Typography } from "@mui/material";
import MessageScreen from "./MessageScreen";
import MessageForm from "../MessageForm/MessageForm";
import dummyMessages from "../../../DummyData/dummyMessages";

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

function Chat() {
  return (
    <div className="chatGrid">
      <div className="chatInfo">
        <ChatInfo />
      </div>
      <MessageScreen messages={dummyMessages} />
      <MessageForm />
    </div>
  );
}

export default Chat;
