import React from 'react';
import { useForm } from 'react-hook-form';
import InputField from 'Components/FormControl/InputField';
import PasswordField from 'Components/FormControl/PasswordtField';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Avatar, Button, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
};
const useStyles = makeStyles({
    form: {
        width: '400px',
    },
    headerform: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    submit: {
        margin: '20px 0px',
        padding: '10px 0px',
    },
});

function RegisterForm(props) {
    const { onSubmit } = props;
    const classes = useStyles();
    const schema = yup
        .object()
        .shape({
            fullName: yup
                .string()
                .required('Please enter your full name')
                .test(
                    'should has at leats two words',
                    'Please enter at least two words',
                    (value) => {
                        return value.split(' ').length >= 2; // check have between words
                    }
                ),
            email: yup
                .string()
                .required('Please enter your full name')
                .email('Please enter a valid email'),
            password: yup
                .string()
                .required('Please enter password')
                .min(6, 'Please enter at least 6 characters'),
            retypePassword: yup
                .string()
                .required('Please retype your password')
                .oneOf([yup.ref('password')], 'Password does not match'),
        })
        .required();

    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: '',
        },
        resolver: yupResolver(schema),
    });

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                <div className={classes.headerform}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                </div>
                <InputField
                    name="fullName"
                    label="Full Name"
                    control={control}
                    formState={formState}
                />
                <InputField name="email" label="Email" control={control} formState={formState} />
                <PasswordField
                    name="password"
                    label="Password"
                    control={control}
                    formState={formState}
                />
                <PasswordField
                    name="retypePassword"
                    label="Retype Password"
                    control={control}
                    formState={formState}
                />
                <Button type="submit" variant="contained" className={classes.submit} fullWidth>
                    SIGN UP
                </Button>
            </form>
        </div>
    );
}

export default RegisterForm;
