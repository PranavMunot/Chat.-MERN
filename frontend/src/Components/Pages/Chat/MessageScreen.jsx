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
  const [currFrnd, setCurrFrnd] = useState(friend?.friendId)

  useEffect(() => {
    console.log('change in friend', friend.friendId)
    let count = 0
    socket.on('recieved-message', (payload) => {
      setCurrFrnd(prevValue => prevValue)
      count++
      console.log(count)
      console.log(`self socket id:${friend.friendId}, to: ${payload.message.to}, from:${payload.message.from}`)
      console.log(`*********************CURRID: ${currFrnd}`)
      if (payload.message.from === friend.friendId) {
        dispatch(friendAction.addMessageToRedux({ message: payload.message }))
      }
    })

    return (() => {
      count = 0
    })
  }, [])

  useEffect(() => {
    setCurrFrnd(friend.friendId)
  }, [friend.friendId])

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
