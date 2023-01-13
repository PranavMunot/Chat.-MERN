import { Badge, Button, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginContext from "../../State/loginContext/LoginContext";
import "./navigation.css";
import Setting from "../Pages/Settings/Setting";
import { IoIosNotifications } from 'react-icons/io'

function Navigation() {
  const [isSetting, setSettingToggle] = useState(false);

  const auth = useContext(LoginContext);
  return (
    <div>
      <nav className="navigation">
        <div className="logo">
          <h2>Chat.</h2>
        </div>
        <div className="navigation_list">
          {auth.isAuthenticated ? (
            <>
              <span style={{ paddingRight: '8px' }}>
                <IconButton>
                  <Badge badgeContent={0} color={'primary'} showZero>
                    <IoIosNotifications />
                  </Badge>
                </IconButton>
              </span>
              <span>
                <IconButton onClick={() => {
                  setSettingToggle(!isSetting);
                }}>
                  <img
                    className="userImage"

                    src={
                      auth.user.user.profilePhoto
                        ? auth.user.user.profilePhoto.secure_url
                        : ""
                    }
                    alt="User Image"
                  />
                </IconButton>
              </span>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="outlined">Login</Button>
            </Link>
          )}
        </div>
        {auth.isAuthenticated && isSetting ? (
          <span className="settingBar">
            <Setting />
          </span>
        ) : null}
      </nav>
    </div>
  );
}

export default Navigation;
