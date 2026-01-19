import { Typography } from '@mui/material'

function ChatInfo({ friendName, profilePhoto }) {
    return (
        <>
            <img src={profilePhoto} className="chatInfoImage" alt="userImage" />
            <span className="chatInfoText">
                <Typography sx={{ lineHeight: 1 }} fontWeight={"500"} variant="h1" fontSize={'1.2rem'} color="primary">
                    {friendName}
                </Typography>
            </span>
        </>
    );
};

export default ChatInfo