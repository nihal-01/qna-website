import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    user: Cookies.get('user-info') ? JSON.parse(Cookies.get('user-info')) : '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { signUser } = userSlice.actions;

export default userSlice.reducer;
