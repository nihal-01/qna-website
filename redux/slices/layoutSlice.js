import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    signupBox: false,
    signinBox: false,
};

export const layoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        updateSignupBox: (state, action) => {
            state.signupBox = action.payload;
        },
        updateSigninBox: (state, action) => {
            state.signinBox = action.payload;
        },
    },
});

export const { updateSigninBox, updateSignupBox } = layoutSlice.actions;

export default layoutSlice.reducer;
