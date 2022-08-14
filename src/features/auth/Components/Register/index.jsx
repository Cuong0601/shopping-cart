import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/auth/userSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';

function Register(props) {
    const dispatch = useDispatch();
    const handleSubmit = async (data) => {
        try {
            // auto set username = email
            data.username = data.email;
            const action = register(data);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            // do some thing here on register successfully
            console.log(user);
        } catch (error) {
            console.log('Failed to register', error);
        }
    };

    return (
        <div>
            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}

export default Register;
