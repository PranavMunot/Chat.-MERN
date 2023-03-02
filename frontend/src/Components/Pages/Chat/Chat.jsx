import React from "react";
import "./Chat.css";
import { Box, CircularProgress, Typography } from "@mui/material";
import MessageScreen from "./MessageScreen";
import MessageForm from "../MessageForm/MessageForm";
import { useSelector } from "react-redux";

const ChatInfo = ({ friendName, profilePhoto }) => {
  return (
    <>
      <img src={profilePhoto} className="chatInfoImage" alt="userImage" />
      <span className="chatInfoText">
        <Typography sx={{ lineHeight: 1 }} fontWeight={"500"} variant="h1" fontSize={'1.2rem'} color="primary">
          {friendName}
        </Typography>
      </span>
    </>
  );
};

function Chat() {
  const friend = useSelector((state) => state.friend)

  return (
    <div className={`chatGrid ${friend.isFriendSelected ? 'chat_screen' : 'null_chat_screen'}`}>
      {friend.isFriendLoading ? (
        <Box className="null_chat_text">
          <CircularProgress />
        </Box>
      ) : (
        <>
          {friend.isFriendSelected ? (
            <>
              <div className="chatInfo">
                <ChatInfo profilePhoto={friend.friendProfilePhoto.secure_url} friendName={friend.friendName} />
              </div>
              <MessageScreen messages={friend.friendMessages} />
              <MessageForm />
            </>) :
            (<div className="null_chat_text">
              <Typography color={'text.secondary'} variant='h5'>Select a friend to Chat.</Typography>
            </div>)
          }
        </>)
      }
    </div>
  );
}

export default Chat;
