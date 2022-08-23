import { configureStore } from '@reduxjs/toolkit';
import counterReducer from 'features/Counter/counterSlice';

import userReducer from 'features/auth/userSlice';

const rootReducer = {
    counter: counterReducer,
    user: userReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});
