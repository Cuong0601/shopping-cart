import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/auth/userSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';

Register.propTypes = {
    closeDialog: PropTypes.func,
};

function Register(props) {
    const dispatch = useDispatch();
    const { closeDialog } = props;
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (data) => {
        try {
            // auto set username = email
            data.username = data.email;
            const action = register(data);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            // do some thing here on register successfully
            console.log(user);
            enqueueSnackbar('Register successfully 🔔', { variant: 'success' });

            // close dialog
            if (closeDialog) closeDialog();
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;
