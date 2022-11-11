import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import image from '../../../TestImages/cld-sample-2.jpg'
import './UserList.css'

const ListItem = () =>{
    return(
        <>
        <Card variant='outlined' sx={{my:1,mr:1, borderRadius:'15px'}} >
            <CardActionArea sx={{display:'flex', justifyContent:'left',pl:1.5}}>
                <CardMedia>
                    <img src={image} className='listUserImage' alt="userImage"  />
                </CardMedia>
                <CardContent sx={{p:1.5}}>
                    <Typography component="div"  variant='body1'>
                        User Name
                    </Typography>
                    <Typography textOverflow='clip' variant='caption'  color={'text.secondary'}>
                        ***v54
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        </>
    )
}

function List() {
    return (
        <div className='list'>
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
        </div>
    )
}

export default List