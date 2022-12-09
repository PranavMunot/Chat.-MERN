import {
  Typography,
  Box,
  IconButton,
  Button,
  Divider,
  TextField,
  ButtonGroup,
} from "@mui/material";

import React, { useState } from "react";
import "./Requests.css";
import { TbX, TbCheck } from "react-icons/tb";
import { AiOutlineUserAdd } from "react-icons/ai";

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

function Requests() {
  const [chatCode, setChatCode] = useState("");
  const [openChatCodeSection, setChatCodeSection] = useState(false);
  const [isChatCodeValid, setChatCodeValidity] = useState(false);
  const [requestListStatus, setRequestListStatus] = useState("sent");

  const changeHandler = (e) => {
    setChatCode(e.target.value);
    e.target.value.length === 6
      ? setChatCodeValidity(true)
      : setChatCodeValidity(false);
  };
  return (
    <div className="requestList">
      <div className="requestHeader">
        <Typography variant="h4" sx={{ fontSize: "18px", py: 1 }}>
          Requests
        </Typography>
        <span className="requestController">
          <span
            onClick={() => {
              setChatCodeSection(!openChatCodeSection);
            }}
          >
            <Typography
              color={"primary"}
              variant="h1"
              sx={{ fontSize: "12px", display: "flex", alignItems: "center" }}
            >
              <AiOutlineUserAdd />
              New
            </Typography>
          </span>
        </span>
      </div>
      {openChatCodeSection ? (
        <>
          <Box sx={{ display: "flex ", mb: 1 }}>
            <TextField
              placeholder="Friend's Chat code"
              name="chatCode"
              onChange={changeHandler}
              value={chatCode}
              sx={{ mr: 1 }}
              variant="outlined"
              size="small"
            />
            <Button
              disabled={!isChatCodeValid}
              disableElevation
              variant="contained"
              size="small"
            >
              Send
            </Button>
          </Box>
        </>
      ) : null}

      <Divider sx={{ mb: 1 }} />

      <div>
        <ButtonGroup size="small" fullWidth sx={{ pb: 1 }}>
          <Button>
            <Typography
              color={"primary"}
              variant="h4"
              sx={{ fontSize: "12px" }}
              onClick={setRequestListStatus("sent")}
            >
              Sent
            </Typography>
          </Button>
          <Button>
            <Typography
              color={"primary"}
              variant="h4"
              sx={{ fontSize: "12px" }}
              onClick={setRequestListStatus("recieved")}
            >
              Recieved
            </Typography>
          </Button>
        </ButtonGroup>
      </div>
      <div>
        {requestListStatus === "sent" ? <ListComponent /> : <ListComponent />}
      </div>
    </div>
  );
}

export default Requests;
