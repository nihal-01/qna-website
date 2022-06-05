import { configureStore } from '@reduxjs/toolkit';

import {
    groupReducer,
    layoutReducer,
    questionReducer,
    userReducer,
} from './slices';

export const store = configureStore({
    reducer: {
        layout: layoutReducer,
        user: userReducer,
        question: questionReducer,
        group: groupReducer,
    },
});
