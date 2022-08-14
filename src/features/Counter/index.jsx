import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './counterSlice';

Counter.propTypes = {};

function Counter(props) {
    const counter = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    return (
        <div style={{ padding: 20 }}>
            <h1>Counter: {counter}</h1>
            <button onClick={() => dispatch(decrement())}>-</button>
            <button onClick={() => dispatch(increment())}>+</button>
        </div>
    );
}

export default Counter;
