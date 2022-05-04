import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../../axios';

const fetchCategories = createAsyncThunk(
    '/question/fetchCategories',
    async () => {
        console.log('categories fetching');
        const response = await axios.get('/categories');
        return response.data;
    }
);

const initialState = {
    questions: [],
    categories: [],
};

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
    },
});

export { fetchCategories };

// export const {} = questionSlice.actions;

export default questionSlice.reducer;
