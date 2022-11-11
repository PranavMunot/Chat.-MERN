import { Divider, IconButton, TextField } from '@mui/material'
import React from 'react'
import './UserList.css'
import List from './List'

function UserList() {
  return (
    <div className='userList'>
    <span>
      <TextField type='text' size="small" fullWidth sx={{mb:1,borderRadius: '15px'}} variant='outlined' placeholder='Search User/ Group' />
    </span>
    <Divider />
    <List />
    </div>
  )
}

export default UserList