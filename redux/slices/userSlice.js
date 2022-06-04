import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    user: '',
    users: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            Cookies.set('user-info', JSON.stringify(action.payload));
            state.user = action.payload;
        },
        logout: (state, action) => {
            Cookies.set('user-info', '');
            state.user = '';
        },
        updateUsers: (state, action) => {
            state.users = action.payload;
        },
        updateIsFollowing: (state, action) => {
            state.users = state.users.map((singleUser) => {
                if (singleUser._id === action.payload._id) {
                    singleUser.isFollowing = action.payload.isFollowing;
                    if (action.payload.isFollowing) {
                        singleUser.followers += 1;
                    } else {
                        singleUser.followers -= 1;
                    }
                }
                return singleUser;
            });
        },
    },
});

export const { logout, updateIsFollowing, updateUsers, updateUser } =
    userSlice.actions;

export default userSlice.reducer;
