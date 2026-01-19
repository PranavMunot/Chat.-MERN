import { Badge, Button, IconButton } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../State/loginContext/LoginContext";
import "./navigation.css";
import Setting from "../Pages/Settings/Setting";
import { IoIosNotifications } from 'react-icons/io'

function Navigation() {
  const [isSetting, setSettingToggle] = useState(false);
  const { isAuthenticated, user } = useAuth();

  return (
    <div>
      <nav className="navigation">
        <div className="logo">
          <h2>Chat.</h2>
        </div>
        <div className="navigation_list">
          {isAuthenticated ? (
            <>
              <span style={{ paddingRight: '8px' }}>
                <IconButton>
                  <Badge badgeContent={0} color={'primary'} showZero>
                    <IoIosNotifications />
                  </Badge>
                </IconButton>
              </span>


              <IconButton onClick={() => {
                setSettingToggle(!isSetting);
              }}>
                <img
                  className="userImage"
                  role="button"
                  src={
                    user?.user?.profilePhoto
                      ? user?.user?.profilePhoto.secure_url
                      : ""
                  }
                  alt={user?.user?.name || 'User'}
                />
              </IconButton>

            </>
          ) : (
            <Link to="/auth">
              <Button variant="outlined">Login</Button>
            </Link>
          )}
        </div>
        {
          isAuthenticated && isSetting ? (
            <span className="settingBar">
              <Setting />
            </span>
          ) : null
        }
      </nav >
    </div >
  );
}

export default Navigation;
