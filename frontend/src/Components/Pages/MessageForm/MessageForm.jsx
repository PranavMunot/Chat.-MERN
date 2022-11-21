import React, { useState, useReducer } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { IoSend } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
const emojis = require("emojis-list");

const inputReducerFunction = (state, action) => {
  switch (action.type) {
    case "changeMessage":
      state = action.payload;
      return state;
    default:
      return state;
  }
};

const initialReducerValue = "";

const MessageForm = () => {
  const [emojiSection, setEmojiSection] = useState(false);
  const [state, dispatch] = useReducer(inputReducerFunction, "");

  return (
    <div>
      {emojiSection ? (
        <div className="emojiSection">
          {emojis.map((emoji, index) => {
            return (
              <Box
                className="emoji"
                onClick={() => {
                  dispatch({ type: "changeMessage", payload: emoji });
                }}
              >
                {emoji}
              </Box>
            );
          })}
        </div>
      ) : null}

      <div className="messageForm">
        <IconButton
          onClick={() => {
            setEmojiSection(!emojiSection);
          }}
        >
          {emojiSection ? "😀" : "😐"}
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
            pt: 0,
          }}
          size="small"
          color="#103783"
          multiline
          fullWidth
          InputProps={{
            disableUnderline: true,
          }}
          value={state}
          onChange={(e) => {
            dispatch({ type: "changeMessage", payload: e.target.value });
          }}
        />
        <IconButton size="medium">
          <FiPaperclip className="icon" />
        </IconButton>
        <IconButton size="medium" sx={{ ml: 1 }}>
          <IoSend className="icon" />
        </IconButton>
      </div>
    </div>
  );
};

export default MessageForm;
