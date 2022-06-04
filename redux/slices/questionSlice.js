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
    singleQuestion: {},
    categories: [],
    answers: [],
    isLoading: false,
    isEdit: false,
    answersCount: 0,
    filters: {
        polls: false,
        noAnswers: false,
    },
    sort: 'createdAt:desc',
    sidebarData: {},
    rightSidebarLoading: true,
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
        updateIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        updateSidebarData: (state, action) => {
            state.sidebarData = action.payload;
        },
        updateRightSidebarLoading: (state, action) => {
            state.rightSidebarLoading = action.payload;
        },
        updateQuestions: (state, action) => {
            state.questions = action.payload;
        },
        updateSingleQuestion: (state, action) => {
            state.singleQuestion = action.payload;
        },
        updateSingleQstnVotes: (state, action) => {
            state.singleQuestion.votes = action.payload;
        },
        updateQuestionFavourite: (state, action) => {
            state.singleQuestion.isFavourited = action.payload.isFavourited;
            state.singleQuestion.favouritesCount =
                action.payload.favouritesCount;
        },
        updateAnswers: (state, action) => {
            state.answers = action.payload;
        },
        updateAnswersVotesCount: (state, action) => {
            state.answers = state.answers.map((answer) => {
                if (answer._id === action.payload.answerId) {
                    answer.votes = action.payload.votes;
                }
                if (answer?.replies?.length > 0) {
                    answer.replies.map((reply) => {
                        if (reply._id === action.payload.answerId) {
                            reply.votes = action.payload.votes;
                        }

                        return reply;
                    });
                }
                return answer;
            });
        },
        removeAnswer: (state, action) => {
            state.answers = state.answers.filter((answer) => {
                if (answer?.replies?.length > 0) {
                    answer.replies = answer.replies.filter((ans) => {
                        return ans._id !== action.payload;
                    });
                }
                return answer._id !== action.payload;
            });
            state.answersCount -= 1;
        },
        updateIsEdit: (state, action) => {
            state.isEdit = action.payload;
        },
        updateAnswersCount: (state, action) => {
            state.answersCount = action.payload;
        },
        incrementAnswersCount: (state, action) => {
            state.answersCount += 1;
        },
        updatePoll: (state, action) => {
            state.singleQuestion.poll.map((myPoll) => {
                if (myPoll.option === action.payload.option) {
                    myPoll.votes += 1;
                }
                return myPoll;
            });

            state.singleQuestion.polledUsers
                ? state.singleQuestion.polledUsers.push(action.payload._id)
                : (state.singleQuestion.polledUsers = [action.payload._id]);

            console.log(state.singleQuestion);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        });
        builder.addCase(fetchQuestions.fulfilled, (state, action) => {
            state.isLoading = false;
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
    updateIsLoading,
    updateSidebarData,
    updateRightSidebarLoading,
    updateQuestions,
    updateSingleQstnVotes,
    updateSingleQuestion,
    updateQuestionFavourite,
    updateAnswers,
    updateAnswersVotesCount,
    removeAnswer,
    updateIsEdit,
    updateAnswersCount,
    incrementAnswersCount,
    updatePoll,
} = questionSlice.actions;

export default questionSlice.reducer;
