import Navigation from '../../Navigation/Navigation'
import useAuth from '../../../State/loginContext/LoginContext'
import { Typography, Box } from '@mui/material'

function UserSetting() {

    const { user } = useAuth()

    return (
        <>
            <Navigation />
            {/* TODO: breadcrumb */}
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <img alt={user?.user?.name} src={user.user.profilePhoto.secure_url} />
                <Typography sx={{ fontWeight: '500', ml: 2 }} variant='h3'>{user.user.name}</Typography>
            </Box>
        </>
    )
}

export default UserSetting