import React from "react";
import "./Setting.css";
import LoginContext from "../../../State/loginContext/LoginContext";
import { useContext } from "react";
import {
  Box,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { IoIosSettings } from "react-icons/io";
import { format } from "date-fns";
import RequestList from "../RequestList/RequestList";

function Setting() {
  const auth = useContext(LoginContext);

  return (
    <div className="userDashBoard">
      <Box
        className="userProfileImageBox"
        sx={{ backgroundImage: `url('${auth.user.user.photo.secure_url}')` }}
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
          {format(new Date(auth.user.user.createdAt), "dd/mm/yyyy")}
        </Typography>
      </div>
      <Divider />
      <ListItemButton>
        <ListItemIcon>
          <IoIosSettings />
        </ListItemIcon>
        <ListItemText primary="Account Setting" />
      </ListItemButton>
      <Divider />
      <RequestList />
    </div>
  );
}

export default Setting;
