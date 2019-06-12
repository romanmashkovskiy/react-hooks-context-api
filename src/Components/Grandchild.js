import React from 'react';
import {useStateValue} from './StateProvider';

export default () => {
    const [state, dispatch] = useStateValue();

    return (
        <div>
            <h1>Grandchild</h1>
            <h3>Count: {state.count.quantity}</h3>
            <button
                onClick={() => dispatch({
                    type: 'increment',
                })}
            >
                Increment
            </button>
            <button
                onClick={() => dispatch({
                    type: 'decrement',
                })}
            >
                Decrement
            </button>
        </div>
    );
};