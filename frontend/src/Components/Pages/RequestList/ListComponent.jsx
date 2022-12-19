import React from "react";
import "./Requests.css";
import {
    Typography,
    Box,
    IconButton,
} from "@mui/material";
import { TbX, TbCheck } from "react-icons/tb";

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

const ListComponent = ({ List }) => {
    return (
        <>
            {
                List.length > 0 ? List.map(listData => {
                    return (
                        <Box className="listComponent">
                            <Box sx={{ px: 1, justifyContent: "center" }}>
                                <Typography variant="body" component={"div"} sx={{ lineHeight: 1 }}>
                                    {listData.name}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color={"text.secondary"}
                                    sx={{ fontSize: "12px", lineHeight: 0.5 }}
                                >
                                    {listData.chatCode}
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
                    )
                }) : (<NoListItem />)
            }
        </>
    )


};


export default ListComponent;

// 
{/*  */ }