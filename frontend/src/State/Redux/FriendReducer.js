import { createSlice } from '@reduxjs/toolkit'

const initialFriendState = {
    isFriendSelected: false,
    friendId: '',
    friendName: '',
    friendChatCode: '',
    friendProfilePhoto: '',
    friendAccountCreatedAt: '',
    isMessageLimit: true,
    messageLimit: 15,
    friendMessages: [],
    sharedImages: [],
    sharedLinks: []
}

const friendSlice = createSlice({
    name: 'friendStateRedux',
    initialState: initialFriendState,
    reducers: {
        selectedUser(state, action) {
            state.isFriendSelected = true
            state.friendId = action.payload.friendId
            state.friendName = action.payload.friendName
            state.friendProfilePhoto = action.payload.friendProfilePhoto
            state.friendChatCode = action.payload.friendChatCode
            state.friendMessages = action.payload.messages
            state.friendAccountCreatedAt = action.payload.friendAccountCreatedAt
        },
        addMessageToRedux(state, action) {
            state.friendMessages = [...state.friendMessages, action.payload.message]
        },
        addMultipleMessagesToRedux(state, action) {
            state.friendMessages = [...action.payload.messages]
        },
        clearAllData(state) {
            state = initialFriendState
        }
    }
})

export const friendAction = friendSlice.actions
export default friendSlice