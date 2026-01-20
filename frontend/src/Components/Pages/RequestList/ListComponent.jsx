import { useState, useEffect } from "react";
import { axiosInstance } from '../../../api/axios'
import useAuth from '../../../State/loginContext/LoginContext'
import "./Requests.css";
import {
    Typography,
    Box,
    IconButton,
} from "@mui/material";
import { TbX, TbCheck } from "react-icons/tb";
import { useSocket } from "../../../Sockets/useSocket";

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

const ListComponent = ({ listType }) => {

    const auth = useAuth();
    const { emit } = useSocket();

    const [requestListData, setRequestListData] = useState({ isLoading: true, sent: [], recieved: [] })

    const getUserData = async () => {
        await axiosInstance.get(`/getRequests`)
            .then(res => { setRequestListData({ isLoading: false, sent: res.data.sent, recieved: res.data.recieved }) })
            .catch(err => {
                // console.log(`Error in getting GET REQUESST API: ${err}`)
            })
    }

    useEffect(() => {
        getUserData()
    }, [])

    const handleSelection = async (chatCode, acceptStatus) => {
        emit('recieve-user-add-request', { RecieverChatCode: auth.user.user.chatCode, SenderChatCode: chatCode })
        await axiosInstance.post(`/acceptRequest`, {
            chatCode,
            acceptStatus
        })
            .then(({ _ }) => {
                setRequestListData(prevState => ({
                    ...prevState, isLoading: true
                }))
                getUserData()
            })
            .catch(err => {
                // console.log(err)
            })
    }

    return (
        <>
            {
                requestListData[listType].length > 0 ? requestListData[listType].map(listData => {
                    return (
                        <Box key={listData.chatCode} className="listComponent">
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
                            {listType === 'recieved' ?
                                (<Box>
                                    <IconButton onClick={() => { handleSelection(listData.chatCode, false) }} sx={{ color: "crimson" }}>
                                        <TbX />
                                    </IconButton>
                                    <IconButton onClick={() => { handleSelection(listData.chatCode, true) }} sx={{ color: "green", mr: 1 }}>
                                        <TbCheck />
                                    </IconButton>
                                </Box>)
                                : null}

                        </Box>
                    )
                }) : (<NoListItem />)
            }
        </>
    )

};

export default ListComponent;