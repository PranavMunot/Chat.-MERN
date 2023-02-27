import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useState, useEffect, useContext } from "react";
import "./MessageScreen.css";
import LoginContext from '../../../State/loginContext/LoginContext'
import socket from "../../../Sockets/SocketInit";
import { useSelector, useDispatch } from "react-redux";
import { friendAction } from "../../../State/Redux/FriendReducer";
import { axiosInstance } from '../../../api/axios'


function MessageScreen({ messages }) {
  const [messageLimit, setMessageLimit] = useState(45)
  const [isMessageAvailable, setIsMessageAvailable] = useState(true)
  const messagesColumnRef = useRef(null);
  const auth = useContext(LoginContext)
  const dispatch = useDispatch()
  const friend = useSelector(state => state.friend)
  const [currMessage, setCurrMessage] = useState()

  useEffect(() => {
    socket.on('recieved-message', (payload) => {
      if (payload.message.from === friend.friendId) {
        setCurrMessage(payload.message)
      }
    })
  })

  useEffect(() => {
    console.log(friend.friendId, currMessage?.from)
    if (friend.friendId === currMessage?.from) dispatch(friendAction.addMessageToRedux({ message: currMessage }));
  }, [currMessage])

  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messages]);

  const getMoreMessages = async (scrollPosition) => {

    isMessageAvailable && await axiosInstance.post('/messages/getMessages', { to: friend.friendId, limit: messageLimit })
      .then(({ data }) => {
        if (data.foundMessages.length < messageLimit) {
          setIsMessageAvailable(false)
        }
        messagesColumnRef.current.scrollTop = Math.floor(scrollPosition);
        setMessageLimit((prev) => (prev + 15))
        dispatch(friendAction.addMultipleMessagesToRedux({ messages: data.foundMessages }))
      })
      .catch(error => console.log(error))
  }

  return (
    <div className={`messageScreen`} onScroll={(e) => { return e.target.scrollTop === 0 && getMoreMessages(e.target.scrollTop) }} ref={messagesColumnRef}>
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
