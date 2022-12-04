import { Button } from "@mui/material";
import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginContext from "../../State/loginContext/LoginContext";
import "./navigation.css";
import Setting from "../Pages/Settings/Setting";

function Navigation() {
  const [isSetting, setSettingToggle] = useState(false);

  const auth = useContext(LoginContext);
  return (
    <div>
      <nav className="navigation">
        <span className="logo">
          <h2>Chat.</h2>
        </span>
        <span>
          {auth.isAuthenticated ? (
            <img
              className="userImage"
              onClick={() => {
                setSettingToggle(!isSetting);
              }}
              src={
                auth.user.user.profilePhoto
                  ? auth.user.user.profilePhoto.secure_url
                  : ""
              }
              alt="User Image"
            />
          ) : (
            <Link to="/auth">
              <Button variant="outlined">Login</Button>
            </Link>
          )}
        </span>
        {isSetting && auth.isAuthenticated ? (
          <span className="settingBar">
            <Setting />
          </span>
        ) : null}
      </nav>
    </div>
  );
}

export default Navigation;
