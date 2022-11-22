import { Typography, Box, IconButton } from "@mui/material";
import React from "react";
import "./RequestList.css";
import { TbX, TbCheck } from "react-icons/tb";

const ListComponent = () => {
  return (
    <Box className="listComponent">
      <Box sx={{ px: 1, justifyContent: "center" }}>
        <Typography variant="body" component={"div"} sx={{ lineHeight: 1 }}>
          Pranav Munot
        </Typography>
        <Typography
          variant="caption"
          color={"text.secondary"}
          sx={{ fontSize: "12px", lineHeight: 0.5 }}
        >
          v56tfd
        </Typography>
      </Box>
      <Box>
        <IconButton sx={{ color: "crimson" }}>
          <TbX />
        </IconButton>
        <IconButton sx={{ color: "green", mr: 1 }}>
          <TbCheck />
        </IconButton>
      </Box>
    </Box>
  );
};

const NoListItem = () => {
  return (
    <div className="noListItem">
      <Typography
        sx={{ fontSize: "12px", textAlign: "center" }}
        color="text.secondary"
      >
        👦👧Seriously No Requests?😺🐶
      </Typography>
    </div>
  );
};

function RequestList() {
  return (
    <div className="requestList">
      <Typography variant="h4" sx={{ fontSize: "18px", py: 1 }}>
        Requests
      </Typography>
      <ListComponent />
      {/* <NoListItem /> */}
    </div>
  );
}

export default RequestList;
