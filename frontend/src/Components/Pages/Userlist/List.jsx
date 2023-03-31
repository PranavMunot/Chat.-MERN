import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
  TextField,
  Button
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./UserList.css";
import { axiosInstance } from "../../../api/axios";
import socket from "../../../Sockets/SocketInit";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from 'react-redux'
import { friendAction } from '../../../State/Redux/FriendReducer'

const ListItem = ({ friendId, friendName, friendChatCode, friendProfilePhoto, friendAccountCreatedAt }) => {

  const dispatch = useDispatch()

  const handelFriendSelection = async () => {
    dispatch(friendAction.fetchingUser({ status: true }))
    await axiosInstance.post('/messages/getMessages', { to: friendId, limit: 30 })
      .then(({ data }) => {
        dispatch(friendAction.selectedUser({ friendId, friendName, friendProfilePhoto, friendChatCode, messages: data.foundMessages, friendAccountCreatedAt }))
        dispatch(friendAction.fetchingUser({ status: false }))
      }
      )
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
            <img src={friendProfilePhoto && friendProfilePhoto.secure_url} className="listUserImage" alt="userImage" />
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

  const friend = useSelector(state => state.friend)
  const dispatch = useDispatch()
  const [userFriendList, setUserFriendList] = useState({ isLoading: true, data: [] })
  const [currUser, setCurrUser] = useState()
  const [chatCode, setChatCode] = useState("");
  const [isChatCodeValid, setChatCodeValidity] = useState(false);
  const [helperMessage, setHelperMessage] = useState({ isShowing: false, message: '' })


  const changeHandler = (e) => {
    setChatCode(e.target.value);
    e.target.value.length === 6
      ? setChatCodeValidity(true)
      : setChatCodeValidity(false);
  };




  const sendRequest = async () => {
    await axiosInstance.post('/sendRequest', { chatCode }).then(
      ({ data }) => {
        console.log(data)
        if (data.success) {
          setChatCode('')
          setChatCodeValidity(false)
          setHelperMessage({ isShowing: true, message: data.message })
          setTimeout(() => {
            setHelperMessage({ isShowing: false, message: '' })
          }, 3000)
        }
        else {
          setHelperMessage({ isShowing: true, message: data.message })
          setTimeout(() => {
            setHelperMessage({ isShowing: false, message: '' })
          }, 3000)
        }
      }
    ).catch(err => {
      console.log(err)
      setHelperMessage({ isShowing: true, message: 'Error in sending request!' })
      setTimeout(() => {
        setHelperMessage({ isShowing: false, message: '' })
      }, 3000)
    })
  }


  useEffect(() => {
    (async () => {
      await axiosInstance.get('/getMultipleUsersById').then(
        ({ data }) => { setUserFriendList({ isLoading: false, data: data.data }) }
      ).catch(err => { console.log(err) })
    })()
  }, [])

  useEffect(() => {
    socket.on('get_user_after_accept', (payload) => {
      setUserFriendList({ ...userFriendList, data: [...userFriendList.data, payload.user] })
    })
    socket.on('delete_user_after_accept', (payload) => {
      setCurrUser(payload.user)
      console.log('delete')
    })
  })

  useEffect(() => {
    setUserFriendList({
      ...userFriendList, data: userFriendList.data.filter((user) => (user.id === currUser.id))
    })
    if (currUser?.id === friend?.friendId)
      dispatch(friendAction.clearAllData())
  }, [currUser])

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
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography variant="body1" fontSize={'0.8rem'} >😕Hey! seems like no friends here?😕 </Typography>
                {/* <Typography variant="body1" fontSize={'0.8rem'} >Enter friend's 6-digit chat code </Typography> */}
                <Box sx={{ display: "flex ", mt: 2 }}>
                  <TextField
                    placeholder="Friend's Chat code"
                    name="chatCode"
                    onChange={changeHandler}
                    value={chatCode}
                    sx={{ mr: 1 }}
                    variant="outlined"
                    size="small"
                  />
                  <Button
                    disabled={!isChatCodeValid}
                    disableElevation
                    variant="contained"
                    size="small"
                    onClick={sendRequest}
                  >
                    Send
                  </Button>
                </Box>
              </Box>

            )}
          </>
        )}
    </div>
  );
}

export default List;
