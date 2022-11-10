import React from 'react'

import Chat from '../Chat/Chat'
import Setting from '../Settings/Setting'
import UserList from '../Userlist/UserList'

function ChatWindow() {
  return (
    <>
    <UserList />
    <Chat />
    <Setting />
    </>
  )
}

export default ChatWindow