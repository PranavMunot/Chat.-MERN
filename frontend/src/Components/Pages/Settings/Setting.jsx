import React from "react";
import "./Setting.css";
import LoginContext from "../../../State/loginContext/LoginContext";
import { useContext } from "react";
import { Box, Divider, ButtonGroup, Button, Typography } from "@mui/material";
import { format } from "date-fns";
import Requests from "../RequestList/Requests";
import { useDispatch } from "react-redux";
import { friendAction } from "../../../State/Redux/FriendReducer";

function Setting() {
  const auth = useContext(LoginContext);
  const dispatch = useDispatch()

  const logoutHandler = () => {
    auth.logout();
    dispatch(friendAction.clearAllData())
  };

  return (
    <div className="userDashBoard">
      <Box
        className="userProfileImageBox"
        sx={{
          backgroundImage: `url('${auth.user.user.profilePhoto
            ? auth.user.user.profilePhoto.secure_url
            : null
            }')`,
        }}
      />
      <div className="userProfileInfo">
        <Typography component={"div"} variant="h3" sx={{ fontSize: "22px" }}>
          {auth.user.user.name}
          <span className="chatCode">{auth.user.user.chatCode}</span>
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
      <Box width={'100%'}>
        <ButtonGroup
          disableElevation
          variant="outlined"
          fullWidth
          sx={{ mb: 2, bgcolor: 'rgba(235, 244, 245,1)' }}
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
      </Box>
      <Divider />

      <Requests />
    </div>
  );
}

export default Setting;
