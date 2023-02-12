import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useEffect, useContext } from "react";
import "./MessageScreen.css";
import LoginContext from '../../../State/loginContext/LoginContext'


function MessageScreen({ messages }) {
  const messagesColumnRef = useRef(null);
  const auth = useContext(LoginContext)

  console.log(messages)
  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messages]);

  const callApi = () => {
    console.log('checking more messages')
  }

  return (
    <div className={`messageScreen`} onScroll={(e) => { return e.target.scrollTop === 0 ? callApi() : null }} ref={messagesColumnRef}>
      {messages.map((message, index) => {
        return (
          <Box
            key={index}
            className={`messageBox ${(auth.user.user._id === message.from) ? "justify-right" : "justify-left"}`}
          >

            <Box
              className={` ${(message.from === auth.user.user._id)
                ? "self-message border-right"
                : "message border-left"
                }`}
            >
              <Typography variant="body1">{message.message}</Typography>
            </Box>
          </Box>
        );
      })}
    </div>
  );
}

export default MessageScreen;
