import { configureStore } from '@reduxjs/toolkit';

import { layoutReducer, userReducer } from './slices';

export const store = configureStore({
    reducer: {
        layout: layoutReducer,
        user: userReducer,
    },
});
