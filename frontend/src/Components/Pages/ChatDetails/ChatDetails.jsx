import React from "react";
import "./ChatDetails.css";
import image from "../../../TestImages/cld-sample-2.jpg";
import {
  Box,
  Button,
  ButtonBase,
  ButtonGroup,
  Chip,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import LoginContext from "../../../State/loginContext/LoginContext";

const ClientDetailBox = () => {
  const auth = useContext(LoginContext);
  return (
    <>
      <Box className="clientDetailBox">
        <Box
          sx={{ backgroundImage: `url(${auth.user.user.photo.secure_url})` }}
          className={"clientImage"}
        />
        <Box className={"clientInfo"}>
          <Typography
            fontSize={"18px"}
            component={"div"}
            color="text.primary"
            variant="h4"
          >
            Pranav Munot
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
            24/04/2022
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
      <Button variant="contained" size="small" color="error" acc>
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
