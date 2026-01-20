import { useState, useReducer, useRef } from "react";
import { Alert, CircularProgress, IconButton, Snackbar, TextField } from "@mui/material";
import { IoSend } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
import { axiosInstance } from '../../../api/axios'
import { useSelector, useDispatch } from "react-redux";
import { friendAction } from "../../../State/Redux/FriendReducer";
import { useSocket } from "../../../Sockets/useSocket";
import EmojiPicker, { Emoji } from "emoji-picker-react";


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

const MessageForm = () => {
  const [emojiSection, setEmojiSection] = useState(false);
  const [state, reducerDispatch] = useReducer(inputReducerFunction, "");
  const [sendError, setSendError] = useState({ status: false, message: '' })
  const [sendMessageLoading, setSendMessageLoading] = useState(false)

  const inputRef = useRef();
  const { emit } = useSocket();

  const friend = useSelector(state => state.friend)
  const reduxDispatch = useDispatch()

  const sendMessage = async () => {
    if (state || state.trim() !== "") {
      setSendMessageLoading(true)
      await axiosInstance.post('/messages/sendMessage', { to: friend.friendId, message: state })
        .then(({ data }) => {
          setSendMessageLoading(false)
          reduxDispatch(friendAction.addMessageToRedux({ message: data.newMessage }))
          emit('send-message-to-friend', { friendChatCode: friend.friendChatCode, messageId: data.newMessage._id })
        })
        .catch(err => {
          setSendMessageLoading(false);
          setSendError({ status: true, message: err.response.data.message })
        })
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


  return (
    <div>
      {emojiSection ? <EmojiPicker width={'100%'} height={300} onEmojiClick={(e) => { addEmoji(e.emoji) }} /> : null}
      <div className="messageForm">
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={() => {
              setEmojiSection(!emojiSection);
              inputRef.current.focus()
            }}
          >
            {emojiSection ? <Emoji unified="1f423" size="25" /> : <Emoji unified="1f95a" size="25" />}
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
          inputRef={inputRef}
          fullWidth
          InputProps={{
            disableUnderline: true,
          }}
          value={state}
          // TODO:debounce
          onKeyDown={() => emit('typing')}
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
