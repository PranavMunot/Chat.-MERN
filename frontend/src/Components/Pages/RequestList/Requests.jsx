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
import axios from 'axios'
import "./Requests.css";
import ListComponent from "./ListComponent";
import { AiOutlineUserAdd } from "react-icons/ai";


function Requests() {
  const [chatCode, setChatCode] = useState("");
  const [openChatCodeSection, setChatCodeSection] = useState(false);
  const [isChatCodeValid, setChatCodeValidity] = useState(false);
  const [requestListStatus, setRequestListStatus] = useState("sent");
  const [helperMessage, setHelperMessage] = useState({ isShowing: false, message: '' })



  const changeHandler = (e) => {
    setChatCode(e.target.value);
    e.target.value.length === 6
      ? setChatCodeValidity(true)
      : setChatCodeValidity(false);
  };

  const sendRequest = async () => {
    await axios.post('http://localhost:4000/api/v1/sendRequest', { chatCode }).then(
      ({ data }) => {
        console.log(data)
        if (data.success) {
          setChatCode('')
          setChatCodeValidity(false)
          setHelperMessage({ isShowing: true, message: data.message })
          setTimeout(() => {
            setHelperMessage({ isShowing: false, message: '' })
          }, 3000)
        }
        else {
          setHelperMessage({ isShowing: true, message: data.message })
          setTimeout(() => {
            setHelperMessage({ isShowing: false, message: '' })
          }, 3000)
        }
      }
    ).catch(err => {
      console.log(err)
      setHelperMessage({ isShowing: true, message: 'Error in sending request!' })
      setTimeout(() => {
        setHelperMessage({ isShowing: false, message: '' })
      }, 3000)
    })
  }


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
              onClick={sendRequest}
            >
              Send
            </Button>
          </Box>
          {helperMessage.isShowing ? (
            <Box>
              <Typography variant='caption' fontSize={'12px'}>
                {helperMessage.message}
              </Typography>
            </Box>
          ) : null}

        </>
      ) : null}

      <Divider sx={{ mb: 1 }} />

      <div>
        <ButtonGroup size="small" fullWidth sx={{ pb: 1 }}>
          <Button onClick={() => { setRequestListStatus("sent") }} >
            <Typography
              color={"primary"}
              variant="h4"
              sx={{ fontSize: "12px" }}

            >
              Sent
            </Typography>
          </Button>
          <Button onClick={() => { setRequestListStatus("recieved") }}>
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
        <ListComponent listType={requestListStatus} />
      </div>
    </div>
  );
}

export default Requests;
