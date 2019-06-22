import {usersInitialState, usersReducer} from './users';

export const initialState = {
    users: usersInitialState
};

export const rootReducer = (state, action) => ({
    users: usersReducer(state.users, action)
});