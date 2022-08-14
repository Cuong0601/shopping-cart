import TodoForm from 'features/Todo/Components/TodoForm';
import React from 'react';
import TodoList from '../../Components/TodoList';

function ListPage(props) {
    const todoList = [
        {
            id: 1,
            title: 'Quét nhà',
        },
        {
            id: 2,
            title: 'Lau nhà',
        },
        {
            id: 3,
            title: 'Rửa chén',
        },
        {
            id: 4,
            title: 'Giặt đồ',
        },
    ];
    const handleSubmit = (values) => {
        console.log('Form submit', values);
    };
    return (
        <div>
            <h3>What to do ?</h3>
            <TodoForm onsubmit={handleSubmit} />
            <br />
            <h3>Todo List</h3>
            <TodoList todoList={todoList} />
        </div>
    );
}

export default ListPage;
