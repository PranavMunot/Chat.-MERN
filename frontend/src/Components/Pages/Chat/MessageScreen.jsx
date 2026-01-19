import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState, useEffect, useContext, useLayoutEffect } from "react";
import "./MessageScreen.css";
import { useSelector, useDispatch } from "react-redux";
import { friendAction } from "../../../State/Redux/FriendReducer";
import { axiosInstance } from '../../../api/axios'

import useAuth from '../../../State/loginContext/LoginContext'
import { useSocketEvent } from "../../../Sockets/useSocket";

// TODO:
// virtualise
// fix scroll height

function MessageScreen() {
  const [messageLimit, setMessageLimit] = useState(30)
  const [isMessageAvailable, setIsMessageAvailable] = useState(true)
  const messagesColumnRef = useRef(null);

  const auth = useAuth();
  const dispatch = useDispatch();

  const friend = useSelector(state => state.friend);

  const addMessageFromSocket = async (messageId) => {
    try {
      await axiosInstance.post('/messages/getMessageById', {
        msgId: messageId
      }).then(({ data: message }) => {
        console.log('addmessage', message)
        if (message?.success)
          dispatch(friendAction.addMessageToRedux({ message: message.data }));
      })
    } catch (error) {
      console.error("Error Message", error)
    }
  }

  useSocketEvent('recieved-message', (payload) => {
    if (payload.messageId) {
      addMessageFromSocket(payload.messageId)
    }
  })

  useLayoutEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [friend?.friendMessages]);

  const getMoreMessages = async (scrollPosition) => {

    const prevScrollHeight = messagesColumnRef.current.scrollHeight;
    if (isMessageAvailable) {
      await axiosInstance.post('/messages/getMessages', { to: friend.friendId, limit: messageLimit })
        .then(({ data }) => {
          if (data.foundMessages.length < messageLimit) {
            setIsMessageAvailable(false)
          }
          setMessageLimit((prev) => (prev + 15))
          dispatch(friendAction.addMultipleMessagesToRedux({ messages: data.foundMessages }))
          setTimeout(() => {
            messagesColumnRef.current.scrollTop = Math.floor(messagesColumnRef.current.scrollHeight - prevScrollHeight);
          })


        })
        .catch(error => console.log(error))
    }
  }

  return (
    <div
      className={`messageScreen`}
      onScroll={(e) => {
        return e.target.scrollTop === 0 && getMoreMessages(e.target.scrollTop)
      }}
      ref={messagesColumnRef}
    >
      {friend?.friendMessages?.map((message, index) => {
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
