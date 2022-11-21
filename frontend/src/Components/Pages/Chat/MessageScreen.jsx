import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./MessageScreen.css";

function MessageScreen({ messages }) {
  return (
    <div className={`messageScreen`}>
      {messages.map((message, index) => {
        return (
          <Box
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
