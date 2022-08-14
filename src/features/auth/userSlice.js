import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from 'api/userAPI';

export const register = createAsyncThunk('user/register', async (payload) => {
    const response = await userAPI.register(payload);

    // save data to local storage
    localStorage.setItem('access_token', response.jwt);
    localStorage.setItem('user', JSON.stringify(response.user));

    // return user data
    return response.user;
});

const initialState = {
    current: {},
    settings: {},
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
    },
});

const { reducer } = userSlice;

export default reducer;
