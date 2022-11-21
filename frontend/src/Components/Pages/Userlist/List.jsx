import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import image from "../../../TestImages/cld-sample-2.jpg";
import "./UserList.css";

const ListItem = () => {
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
            <img src={image} className="listUserImage" alt="userImage" />
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
              User Name
            </Typography>
            <Typography
              textOverflow="clip"
              variant="caption"
              color={"text.secondary"}
            >
              ***v54
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {/* <Divider /> */}
    </>
  );
};

function List() {
  return (
    <div className="list">
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </div>
  );
}

export default List;
