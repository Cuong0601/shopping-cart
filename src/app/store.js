import { configureStore } from '@reduxjs/toolkit';
import counterReducer from 'features/Counter/counterSlice';
import userReducer from 'features/auth/userSlice';
import filtersReducer from 'features/Product/Components/Filter/filtersSlice';

const rootReducer = {
    counter: counterReducer,
    user: userReducer,
    filters: filtersReducer,
};

export const store = configureStore({
    reducer: rootReducer,
});
