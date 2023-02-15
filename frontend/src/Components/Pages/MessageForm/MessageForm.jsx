import React, { useState, useReducer, useMemo } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { IoSend } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
import socket from "../../../Sockets/SocketInit";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { friendAction } from "../../../State/Redux/FriendReducer";
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
  const [state, reducerDispatch] = useReducer(inputReducerFunction, "");


  const friend = useSelector(state => state.friend)
  const reduxDispatch = useDispatch()

  const sendMessage = async () => {
    await axios.post('http://localhost:4000/api/v1/messages/sendMessage', { to: friend.friendId, message: state })
      .then(({ data }) => {
        console.log(data.newMessage)
        reduxDispatch(friendAction.addMessageToRedux({ message: data.newMessage }))
        socket.emit('send-message-to-friend', { friendChatCode: friend.friendChatCode, message: data.newMessage })
      })
      .catch(err => console.log(err))
    reducerDispatch({ type: "reset" });
  };

  const addEmoji = (emoji) => {
    reducerDispatch({ type: "addEmoji", payload: emoji });
  };

  const EmojiMemo = useMemo(
    () => <EmojiList clickHandler={addEmoji} />,
    [emojiSection]
  );

  return (
    <div>
      {emojiSection ? EmojiMemo : null}
      <div className="messageForm">
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => {
              setEmojiSection(!emojiSection);
            }}
          >
            {emojiSection ? "😀" : "😐"}
          </IconButton></span>
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
          onKeyDown={
            () => { socket.emit('typing') }
          }
          onChange={(e) => {
            reducerDispatch({ type: "changeMessage", payload: e.target.value });
          }}
        />
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton size="medium">
            <FiPaperclip className="icon" />
          </IconButton>
        </span>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={sendMessage} size="medium" sx={{ ml: 1 }}>
            <IoSend className="icon" />
          </IconButton>
        </span>
      </div>
    </div>
  );
};

export default MessageForm;
