import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import InputField from 'Components/FormControl/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

TodoForm.propTypes = {
    onsubmit: PropTypes.func,
};

function TodoForm(props) {
    const schema = yup
        .object()
        .shape({
            title: yup.string().required('Vui lòng nhập tiêu đề').min(5, 'Số lượng chữ dưới 5'),
        })
        .required();
    const { control, handleSubmit, formState, reset } = useForm({
        defaultValues: {
            title: '',
        },
        resolver: yupResolver(schema),
    });

    const onSubmit = (values) => {
        console.log('Todo Form: ', values);
        reset();
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField name="title" label="Todo" control={control} formState={formState} />
        </form>
    );
}

export default TodoForm;
