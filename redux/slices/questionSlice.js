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

const fetchQuestions = createAsyncThunk(
    '/question/fetchQuestions',
    async (args, { getState }) => {
        console.log('fetching questions');
        const { filters, sort } = getState().question;
        const response = await axios.get(
            `/questions?sort=${sort}&polls=${filters.polls}&noAnswers=${filters.noAnswers}`
        );
        return response.data;
    }
);

const initialState = {
    questions: [],
    categories: [],
    filters: {
        polls: false,
        noAnswers: false,
    },
    sort: 'createdAt:desc',
};

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        updateVotesCount: (state, action) => {
            state.questions = state.questions.map((qstn) => {
                if (qstn._id === action.payload.questionId) {
                    qstn.votes = action.payload.votes;
                }
                return qstn;
            });
        },
        updateSort: (state, action) => {
            state.filters.noAnswers = false;
            state.filters.polls = false;
            state.sort = action.payload;
        },
        updatePollFilter: (state, action) => {
            state.sort = 'createdAt:desc';
            state.filters.noAnswers = false;
            state.filters.polls = action.payload;
        },
        updateNoanswerFilter: (state, action) => {
            state.sort = 'createdAt:desc';
            state.filters.polls = false;
            state.filters.noAnswers = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
        builder.addCase(fetchQuestions.fulfilled, (state, action) => {
            state.questions = action.payload;
        });
    },
});

export { fetchCategories, fetchQuestions };

export const {
    updateVotesCount,
    updateNoanswerFilter,
    updatePollFilter,
    updateSort,
} = questionSlice.actions;

export default questionSlice.reducer;
