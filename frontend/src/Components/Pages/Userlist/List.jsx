import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import image from "../../../TestImages/cld-sample-2.jpg";
import "./UserList.css";
import LoginContext from "../../../State/loginContext/LoginContext";
import axios from "axios";

const ListItem = ({ friendName, friendChatCode, friendProfilePhoto }) => {
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
              {friendChatCode}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

function List() {

  const auth = useContext(LoginContext)
  const [userFriendList, setUserFriendList] = useState({ isLoading: true, data: [] })

  useEffect(() => {
    (async () => {
      await axios.get('http://localhost:4000/api/v1/getMultipleUsersById').then(
        ({ data }) => { setUserFriendList({ isLoading: false, data: data.data }) }
      ).catch(err => { console.log(err) })
    })()
  }, [auth])

  return (
    <div className="list">
      {!userFriendList.isLoading && userFriendList.data.length > 0 ?
        userFriendList.data.map((friendData) => (<ListItem key={friendData.chatCode} friendName={friendData.name} friendProfilePhoto={friendData.profilePhoto} friendChatCode={`***${friendData.chatCode.slice(3)}`} />))
        : (
          <>
            {userFriendList.isLoading ? (<Typography variant='h1'>Loading</Typography>) : (<Typography variant='h1'>No Friends</Typography>)}
          </>
        )}
    </div>
  );
}

export default List;
