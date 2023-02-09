import React from "react";
import "./ChatDetails.css";
import { format } from "date-fns";
import {
  Box,
  Button,
  Chip,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import LoginContext from "../../../State/loginContext/LoginContext";
import { useSelector } from "react-redux";

const ClientDetailBox = () => {

  const friend = useSelector(state => state.friend)

  const auth = useContext(LoginContext);
  return (
    <>
      <Box className="clientDetailBox">
        <Box
          sx={{
            backgroundImage: `url(${friend.isFriendSelected
              ? friend.friendProfilePhoto.secure_url
              : auth.user.user.profilePhoto.secure_url
              })`,
          }}
          className={"clientImage"}
        />
        <Box className={"clientInfo"}>

          <Typography
            fontSize={"18px"}
            component={"div"}
            color="text.primary"
            variant="h4"
            className="clientInfo_textarea"
            sx={{ textEmphasis: 'ButtonText ' }}
          >
            {friend.isFriendSelected
              ? friend.friendName
              : auth.user.user.name}
            {!friend.isFriendSelected && <Typography variant="body2" fontSize={'0.7rem'}> (you)</Typography>}
          </Typography>
          <Typography
            fontSize={"12px"}
            component={"div"}
            color="text.primary"
            variant="caption"
          >
            <span className="online-status"></span> Active
          </Typography>
          <Typography
            fontSize={"12px"}
            component={"div"}
            color="text.primary"
            variant="caption"
            lineHeight={1}
            sx={{ mt: 1 }}
          >
            Member Since:
          </Typography>
          <Typography
            fontSize={"12px"}
            component={"div"}
            color="text.primary"
            variant="caption"
          >
            {format(new Date(friend.isFriendSelected ? friend.friendAccountCreatedAt : auth.user.user.createdAt), 'dd/MM/yyyy')}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

const MediaController = () => {
  return (
    <>
      <Box className="shareController">
        <Typography
          fontSize={"18px"}
          component={"div"}
          color="text.primary"
          variant="h4"
        >
          Media
        </Typography>
        <Box className="chipBox" sx={{ my: 1 }}>
          <Chip
            label="Images"
            size="small"
            component="a"
            href="#basic-chip"
            clickable
            sx={{ mr: 1 }}
          />
          <Chip
            label="Links"
            size="small"
            component="a"
            variant="outlined"
            href="#basic-chip"
            clickable
          />
        </Box>
        <Box className="media-Images"></Box>
        <Box className="media-Links"></Box>
      </Box>
    </>
  );
};

const OnClientActions = () => {
  return (
    <>
      <Button variant="contained" size="small" color="error">
        Remove Friend
      </Button>
    </>
  );
};

function ChatDetails() {


  return (
    <div className="chatDetails">
      <ClientDetailBox />
      <MediaController />
      <OnClientActions />
    </div>
  );
}

export default ChatDetails;
