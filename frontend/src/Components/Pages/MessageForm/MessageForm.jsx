import React, { useState, useReducer, useMemo, useRef, useEffect } from "react";
import { Alert, Box, CircularProgress, IconButton, Snackbar, TextField } from "@mui/material";
import { IoSend } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
import socket from "../../../Sockets/SocketInit";
import { axiosInstance } from '../../../api/axios'
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
  const [sendError, setSendError] = useState({ status: false, message: '' })
  const [sendMessageLoading, setSendMessageLoading] = useState(false)

  const inputRef = useRef()

  const friend = useSelector(state => state.friend)
  const reduxDispatch = useDispatch()

  const sendMessage = async () => {
    if (!state || state.trim() === "") {
      console.log('empty')
    }
    else {
      setSendMessageLoading(true)
      await axiosInstance.post('/messages/sendMessage', { to: friend.friendId, message: state })
        .then(({ data }) => {
          // console.log(data.newMessage)
          setSendMessageLoading(false)
          reduxDispatch(friendAction.addMessageToRedux({ message: data.newMessage }))
          socket.emit('send-message-to-friend', { friendChatCode: friend.friendChatCode, message: data.newMessage })
        })
        .catch(err => { console.log(err.response); setSendMessageLoading(false); setSendError({ status: true, message: err.response.data.message }) })
      reducerDispatch({ type: "reset" });
    }
  };

  const closeSnackbar = () => {
    setSendError({ status: false, message: '' })
  }

  const addEmoji = (emoji) => {
    reducerDispatch({ type: "addEmoji", payload: emoji });
    inputRef.current.focus()
  };

  const EmojiMemo = useMemo(
    () => <EmojiList clickHandler={addEmoji} />, []
  );

  return (
    <div>
      {emojiSection ? EmojiMemo : null}
      <div className="messageForm">
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => {
              setEmojiSection(!emojiSection);
              inputRef.current.focus()
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
          ref={inputRef}
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
          <IconButton color="primary" disabled size="medium">
            <FiPaperclip />
          </IconButton>
        </span>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          {!sendMessageLoading ? (<IconButton disabled={!state || state.trim() === ""} color="primary" onClick={sendMessage} size="medium" sx={{ ml: 1 }}>
            <IoSend />
          </IconButton>) :
            (<CircularProgress size={'1.5rem'} sx={{ ml: 2, mr: 1 }} />)}
        </span>
      </div>
      <Snackbar open={sendError.status} autoHideDuration={6000} onClose={closeSnackbar}>
        <Alert onClose={closeSnackbar} severity="error" sx={{ width: '100%' }}>
          {sendError.message} Please refresh the browser.
        </Alert>
      </Snackbar>
    </div>
  );
};

export default MessageForm;
