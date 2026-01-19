import React, { useState } from "react";
import "./ChatDetails.css";
import { format } from "date-fns";
import {
  Box,
  Button,
  Chip,
  Typography,
  CircularProgress
} from "@mui/material";
import useAuth from "../../../State/loginContext/LoginContext";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from '../../../api/axios'
import { friendAction } from '../../../State/Redux/FriendReducer'

const ClientDetailBox = () => {

  const friend = useSelector(state => state.friend)
  const auth = useAuth();

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
            clickable
            disabled
            sx={{ mr: 1 }}
          />
          <Chip
            label="Links"
            size="small"
            component="a"
            variant="outlined"
            disabled
            clickable
          />
        </Box>
        <Box className="media-Images">
          <Typography fontSize={'1rem'} color={'primary'}>Feature yet to be released!</Typography>
        </Box>
        <Box className="media-Links"></Box>

      </Box>
    </>
  );
};

const OnClientActions = () => {

  const friend = useSelector(state => state.friend)
  const dispatch = useDispatch()
  const [isRemoving, setRemoving] = useState(false)

  async function removeHandler() {
    setRemoving(true)
    try {
      const response = await axiosInstance.delete('/deleteFriend', { data: { friendId: friend.friendId } })
      console.log(response.data)
      setRemoving(false)
      dispatch(friendAction.clearAllData())
    } catch (error) {
      console.log(error.response.status)
      console.log(error.response.data)
      setRemoving(false)
    }
  }

  return (
    <>
      <Button variant="contained" onClick={removeHandler} sx={{ textTransform: 'none' }} disabled={!friend.isFriendSelected || isRemoving} size="small" color="error">
        {isRemoving ? (<><CircularProgress size={'20px'} sx={{ mr: 2 }} color={'error'} /> Removing Friend</>) : `Remove Friend`}
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
