import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import LoginForm from '../LoginForm';
import { login } from 'features/auth/userSlice';

Login.propTypes = {
    closeDialog: PropTypes.func,
};

function Login(props) {
    const dispatch = useDispatch();
    const { closeDialog } = props;
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (data) => {
        try {
            const action = login(data);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            // do some thing here on register successfully
            console.log(user);
            // close dialog
            if (closeDialog) closeDialog();
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <div>
            <LoginForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Login;
