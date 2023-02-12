import { createSlice } from '@reduxjs/toolkit'

const initialFriendState = {
    isFriendSelected: false,
    friendId: '',
    friendName: '',
    friendProfilePhoto: '',
    friendAccountCreatedAt: '',
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
            state.friendMessages = action.payload.messages
            state.friendAccountCreatedAt = action.payload.friendAccountCreatedAt
        }
    }
})

export const friendAction = friendSlice.actions
export default friendSlice