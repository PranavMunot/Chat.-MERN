import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useEffect } from "react";
import "./MessageScreen.css";

function MessageScreen({ messages }) {
  const messagesColumnRef = useRef(null);

  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className={`messageScreen`} ref={messagesColumnRef}>
      {messages.map((message, index) => {
        return (
          <Box
            key={index}
            className={`messageBox ${
              message.isSelf ? "justify-right" : "justify-left"
            }`}
          >
            <Box
              className={` ${
                message.isSelf
                  ? "self-message border-right"
                  : "message border-left"
              }`}
            >
              <Typography variant="body1">{message.text}</Typography>
            </Box>
          </Box>
        );
      })}
    </div>
  );
}

export default MessageScreen;
