import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {StateProvider} from './Components/StateProvider';

const initialState = {
    count: {
        quantity: 0
    },
    picture: null
};

const countReducer = (state, action) => {
    switch (action.type) {
        case 'increment':
            return {
                ...state,
                quantity: state.quantity + 1
            };
        case 'decrement':
            return {
                ...state,
                quantity: state.quantity - 1
            };
        default:
            return state;
    }
};

const pictureReducer = (state, action) => {
    switch (action.type) {
        case 'picture_add':
            return action.picture;
        case 'picture_remove':
            return null;
        default:
            return state;
    }
};

const rootReducer = (state, action) => {
    return {
        count: countReducer(state.count, action),
        picture: pictureReducer(state.picture, action)
    }
};

ReactDOM.render(
    <StateProvider initialState={initialState} reducer={rootReducer}>
        <App/>
    </StateProvider>,
    document.getElementById('root'));


serviceWorker.unregister();
