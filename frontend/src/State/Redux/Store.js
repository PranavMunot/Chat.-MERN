import { configureStore } from '@reduxjs/toolkit'

import friendSlice from './FriendReducer'


const store = configureStore({
    reducer: {
        friend: friendSlice.reducer
    }
})



export default store