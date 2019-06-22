export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

export const usersInitialState = {
    users: [],
    error: null,
    loading: false,
};

export const usersReducer = (state, action) => {
    switch (action.type) {
        case GET_USERS_REQUEST:
            return {
                ...usersInitialState,
                loading: true
            };
        case CREATE_USER_REQUEST:
        case EDIT_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_USERS_SUCCESS:
            return {
                ...usersInitialState,
                users: action.users
            };
        case CREATE_USER_SUCCESS:
            return {
                ...usersInitialState,
                users: state.users.concat(action.user)
            };
        case EDIT_USER_SUCCESS:
            return {
                ...usersInitialState,
                users: state.users
                    .map(user => user.id !== action.user.id ? user : action.user)
            };
        case DELETE_USER_SUCCESS:
            return {
                ...usersInitialState,
                users: state.users
                    .filter(user => user.id !== action.user.id)
            };
        case GET_USERS_FAILURE:
            return {
                ...usersInitialState,
                error: action.error
            };
        case CREATE_USER_FAILURE:
        case EDIT_USER_FAILURE:
        case DELETE_USER_FAILURE:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};