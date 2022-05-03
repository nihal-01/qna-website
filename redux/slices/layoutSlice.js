import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    signupBox: false,
    signinBox: false,
    questionBox: false,
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
        updateQuestionBox: (state, action) => {
            state.questionBox = action.payload;
        },
    },
});

export const { updateSigninBox, updateSignupBox, updateQuestionBox } =
    layoutSlice.actions;

export default layoutSlice.reducer;
