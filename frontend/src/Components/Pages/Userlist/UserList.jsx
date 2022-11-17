import { Divider, IconButton, TextField } from "@mui/material";
import React from "react";
import "./UserList.css";
import List from "./List";

function UserList() {
  return (
    <div className="userList">
      <TextField
        type="text"
        size="small"
        fullWidth
        sx={{ mb: 1, backgroundColor: "#fff", borderRadius: "15px" }}
        variant="outlined"
        placeholder="Search User/ Group"
      />

      {/* <Divider /> */}
      <List />
    </div>
  );
}

export default UserList;
