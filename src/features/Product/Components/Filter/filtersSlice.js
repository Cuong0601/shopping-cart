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
        removeFilterCategory: (state) => {
            const newFilters = { ...state.current };
            delete newFilters['category.id'];
            state.current = newFilters;
        },
        removeFilterPrice: (state) => {
            const newFilters = { ...state.current };
            delete newFilters.salePrice_gte;
            delete newFilters.salePrice_lte;
            state.current = newFilters;
        },
    },
});

const { actions, reducer } = filtersSlice;
export const { updateFilter, removeFilterCategory, removeFilterPrice } = actions;
export default reducer;
