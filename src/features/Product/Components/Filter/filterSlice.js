import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
};

const filterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

const { actions, reducer } = filterSlice;
export const { increment, decrement } = actions;
export default reducer;
