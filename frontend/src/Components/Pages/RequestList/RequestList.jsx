import {
  Typography,
  Box,
  IconButton,
  Button,
  ButtonGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import "./RequestList.css";
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

function RequestList() {
  const [isTextfieldOpen, setTextfieldOpen] = useState(false);
  const [enteredChatCode, setEnteredChatCode] = useState("");
  const toggleHandler = () => {
    setTextfieldOpen(!isTextfieldOpen);
  };

  return (
    <div className="requestList">
      <div className="requestHeader">
        <Typography variant="h4" sx={{ fontSize: "18px", py: 1 }}>
          Requests
        </Typography>
        <span className="requestController">
          <span onClick={toggleHandler}>
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
      <Box sx={{ py: 1 }}>
        <TextField
          maxlength={4}
          variant="outlined"
          placeholder="chat code"
          size="small"
        />
        <Button sx={{ ml: 1 }} variant="outlined">
          Send
        </Button>
      </Box>
      <div>
        <ButtonGroup size="small" fullWidth sx={{ pb: 1 }}>
          <Button>
            <Typography
              color={"primary"}
              variant="h4"
              sx={{ fontSize: "12px" }}
            >
              Sent
            </Typography>
          </Button>
          <Button>
            <Typography
              color={"primary"}
              variant="h4"
              sx={{ fontSize: "12px" }}
            >
              Recieved
            </Typography>
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <ListComponent />
      </div>
      {/* <NoListItem /> */}
    </div>
  );
}

export default RequestList;
