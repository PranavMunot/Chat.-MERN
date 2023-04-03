import { useContext } from 'react'
import Navigation from '../../Navigation/Navigation'
import LoginContext from '../../../State/loginContext/LoginContext'
import { Typography, Box } from '@mui/material'

function UserSetting() {

    const auth = useContext(LoginContext)

    return (
        <>
            <Navigation />
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <img src={auth.user.user.profilePhoto.secure_url} />
                <Typography sx={{ fontWeight: '500', ml: 2 }} variant='h3'>{auth.user.user.name}</Typography>
            </Box>
        </>
    )
}

export default UserSetting