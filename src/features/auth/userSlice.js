import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from 'api/userAPI';
import StorageKeys from 'constants/storage-key';

export const register = createAsyncThunk('user/register', async (payload) => {
    const response = await userAPI.register(payload);

    // save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, response.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(response.user));

    // return user data
    return response.user;
});

export const login = createAsyncThunk('user/login', async (payload) => {
    const response = await userAPI.login(payload);

    // save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, response.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(response.user));

    // return user data
    return response.user;
});

const initialState = {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
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
        [login.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
    },
});

const { reducer } = userSlice;

export default reducer;
