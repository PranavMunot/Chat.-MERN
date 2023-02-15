import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import image from "../../../TestImages/cld-sample-2.jpg";
import "./UserList.css";
import axios from "axios";
import socket from "../../../Sockets/SocketInit";
import { Box } from "@mui/system";
import { useDispatch } from 'react-redux'
import { friendAction } from '../../../State/Redux/FriendReducer'

const ListItem = ({ friendId, friendName, friendChatCode, friendProfilePhoto, friendAccountCreatedAt }) => {

  const dispatch = useDispatch()

  const handelFriendSelection = async () => {
    await axios.post('http://localhost:4000/api/v1/messages/getMessages', { to: friendId })
      .then(({ data }) => dispatch(
        friendAction.selectedUser(
          { friendId, friendName, friendProfilePhoto, friendChatCode, messages: data.foundMessages, friendAccountCreatedAt }
        )
      ))
      .catch(error => console.log(error))


  }


  return (
    <>
      <Card
        variant="outlined"
        className="listItem"
        sx={{
          mb: 1.5,
          mr: 1.5,
          backgroundColor: "rgba(235, 244, 245, 0.8)",
        }}
      >
        <CardActionArea
          sx={{ display: "flex", justifyContent: "left", p: 1.5 }}
          onClick={() => { handelFriendSelection() }}
        >
          <CardMedia>
            <img src={friendProfilePhoto ? friendProfilePhoto.secure_url : image} className="listUserImage" alt="userImage" />
          </CardMedia>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 0,
              pl: 2,
            }}
          >
            <Typography
              color={"text.primary"}
              component="div"
              fontWeight={"600"}
              variant="body1"
            >
              {friendName}
            </Typography>
            <Typography
              textOverflow="clip"
              variant="caption"
              color={"text.secondary"}
            >
              ***{friendChatCode.slice(3, 6)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

function List() {

  const [userFriendList, setUserFriendList] = useState({ isLoading: true, data: [] })

  useEffect(() => {
    (async () => {
      await axios.get('http://localhost:4000/api/v1/getMultipleUsersById').then(
        ({ data }) => { setUserFriendList({ isLoading: false, data: data.data }) }
      ).catch(err => { console.log(err) })
    })()
  }, [])

  useEffect(() => {
    socket.on('get_user_after_accept', (payload) => {
      setUserFriendList({ ...userFriendList, data: [...userFriendList.data, payload.user] })
    })

  })

  return (
    <div className="list">
      {!userFriendList.isLoading && userFriendList.data.length > 0 ?
        userFriendList.data.map((friendData) => (
          <ListItem key={friendData.chatCode}
            friendId={friendData._id}
            friendAccountCreatedAt={friendData.createdAt}
            friendName={friendData.name}
            friendProfilePhoto={friendData.profilePhoto}
            friendChatCode={friendData.chatCode}
          />))
        : (
          <>
            {userFriendList.isLoading ? (
              <>
                <Skeleton variant="rounded" sx={{ mb: 1.5, mr: 1.5, bgcolor: 'rgba(235, 244, 245, 0.4)' }} height={'4rem'} />
                <Skeleton variant="rounded" sx={{ mb: 1.5, mr: 1.5, bgcolor: 'rgba(235, 244, 245, 0.4)' }} height={'4rem'} />
                <Skeleton variant="rounded" sx={{ mb: 1.5, mr: 1.5, bgcolor: 'rgba(235, 244, 245, 0.4)' }} height={'4rem'} />
              </>
            ) : (
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="body1" fontSize={'0.8rem'} >😕Hey! seems like no friends here?😕 </Typography>
              </Box>

            )}
          </>
        )}
    </div>
  );
}

export default List;
