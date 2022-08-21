import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    current: {
        _page: 1,
        _limit: 12,
        _sort: 'salePrice:ASC',
    },
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        updateFilter: (state, actions) => {
            state.current = { ...state.current, ...actions.payload };
        },
    },
});

const { actions, reducer } = filtersSlice;
export const { updateFilter } = actions;
export default reducer;
