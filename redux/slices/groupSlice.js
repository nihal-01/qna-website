import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    group: {},
    posts: [],
};

export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        updateSelectedGroup: (state, action) => {
            state.group = action.payload;
        },
        joinGroup: (state, action) => {
            state.group.users.push(action.payload);
        },
        leaveGroup: (state, action) => {
            state.group.users = state.group.users.filter((user) => {
                return user.toString() !== action.payload.toString();
            });
        },
        updatePosts: (state, action) => {
            state.posts = action.payload;
        },
        addPost: (state, action) => {
            state.posts.unshift(action.payload);
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => {
                return post._id !== action.payload;
            });
        },
    },
});

export const {
    updateSelectedGroup,
    joinGroup,
    leaveGroup,
    updatePosts,
    addPost,
    deletePost,
} = groupSlice.actions;

export default groupSlice.reducer;
