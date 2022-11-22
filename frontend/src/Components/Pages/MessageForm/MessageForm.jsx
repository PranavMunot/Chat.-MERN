import React, { useState, useReducer, useMemo, useRef } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { IoSend } from "react-icons/io5";
import dummyMessages from "../../../DummyData/dummyMessages";
import { FiPaperclip } from "react-icons/fi";
const emojis = require("emojis-list");

const inputReducerFunction = (state, action) => {
  switch (action.type) {
    case "changeMessage":
      state = action.payload;
      return state;
    case "addEmoji":
      state = state + action.payload;
      return state;
    case "reset":
      state = "";
      return state;
    default:
      return state;
  }
};

const EmojiList = ({ clickHandler }) => {
  const transferToParent = (emoji) => {
    clickHandler(emoji);
  };
  return (
    <div className="emojiSection">
      {emojis.map((emoji, index) => {
        return (
          <Box
            key={index}
            className="emoji"
            onClick={() => {
              transferToParent(emoji);
            }}
          >
            {emoji}
          </Box>
        );
      })}
    </div>
  );
};

const MessageForm = () => {
  const [emojiSection, setEmojiSection] = useState(false);
  const [state, dispatch] = useReducer(inputReducerFunction, "");

  const sendMessage = () => {
    dummyMessages.push({
      from: "abc",
      to: "def",
      isSelf: true,
      text: state,
    });
    console.log(state, dummyMessages);
    dispatch({ type: "reset" });
  };

  const addEmoji = (emoji) => {
    dispatch({ type: "addEmoji", payload: emoji });
  };

  const EmojiMemo = useMemo(
    () => <EmojiList clickHandler={addEmoji} />,
    [emojiSection]
  );

  return (
    <div>
      {emojiSection ? EmojiMemo : null}
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
          autoFocus
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
        <IconButton onClick={sendMessage} size="medium" sx={{ ml: 1 }}>
          <IoSend className="icon" />
        </IconButton>
      </div>
    </div>
  );
};

export default MessageForm;
