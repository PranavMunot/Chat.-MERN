import React from "react";
import "./Setting.css";
import LoginContext from "../../../State/loginContext/LoginContext";
import { useContext } from "react";
import {
  Box,
  Divider,
  ButtonGroup,
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import { format } from "date-fns";
import RequestList from "../RequestList/RequestList";

function Setting() {
  const auth = useContext(LoginContext);

  const logoutHandler = () => {
    auth.logout();
  };

  return (
    <div className="userDashBoard">
      <Box
        className="userProfileImageBox"
        sx={{
          backgroundImage: `url('${
            auth.user.user.profilePhoto
              ? auth.user.user.profilePhoto.secure_url
              : null
          }')`,
        }}
      />
      <div className="userProfileInfo">
        <Typography component={"div"} variant="h3" sx={{ fontSize: "22px" }}>
          {auth.user.user.name}
        </Typography>
        <Typography
          component={"div"}
          variant="h5"
          sx={{ fontSize: "12px", pb: 1 }}
        >
          <span className="statusBar" />
          Active
        </Typography>
        <Typography component={"div"} variant="h5" sx={{ fontSize: "12px" }}>
          on Chat. Since{" "}
          {format(new Date(auth.user.user.createdAt), "dd/MM/yyyy")}
        </Typography>
      </div>
      <ButtonGroup
        disableElevation
        variant="outlined"
        fullWidth
        sx={{ mb: 2 }}
        aria-label="Disabled elevation buttons"
      >
        <Button>
          <Typography variant="button" fontSize={"14px"}>
            Settings
          </Typography>
        </Button>
        <Button onClick={logoutHandler}>
          <Typography variant="button" fontSize={"14px"}>
            Logout
          </Typography>
        </Button>
      </ButtonGroup>
      <Divider />
      <RequestList />
    </div>
  );
}

export default Setting;
