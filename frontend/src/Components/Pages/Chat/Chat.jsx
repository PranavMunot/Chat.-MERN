import React, { useEffect } from "react";
import "./Chat.css";
import image from "../../../TestImages/cld-sample-2.jpg";
import { Typography } from "@mui/material";
import MessageScreen from "./MessageScreen";
import MessageForm from "../MessageForm/MessageForm";
import dummyMessages from "../../../DummyData/dummyMessages";
import { useState } from "react";

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
  const [messages, setMessages] = useState(dummyMessages);
  useEffect(() => {
    setMessages(dummyMessages);
  }, [dummyMessages]);

  return (
    <div className="chatGrid">
      <div className="chatInfo">
        <ChatInfo />
      </div>
      <MessageScreen messages={messages} />
      <MessageForm />
    </div>
  );
}

export default Chat;
