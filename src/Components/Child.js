import React, {Component} from 'react';
import Grandchild from './Grandchild';
import {StateContext} from './StateProvider';

class Child extends Component {
    static contextType = StateContext;

    render() {
        const [state, dispatch] = this.context;

        return (
            <div>
                <h1>Child</h1>
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
                <Grandchild/>
            </div>
        );
    }
}

export default Child;