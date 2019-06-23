import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useStateValue} from './store';
import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    EDIT_USER_REQUEST,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE
} from './store/reducers/users';

export default () => {
    const [state, dispatch] = useStateValue();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                dispatch({type: GET_USERS_REQUEST});
                const response = await axios({
                    method: 'get',
                    url: 'http://localhost:4000/api/users',
                });

                const users = response.data;

                dispatch({
                    type: GET_USERS_SUCCESS,
                    users
                });
            } catch (error) {
                dispatch({
                    type: GET_USERS_FAILURE,
                    error
                });
            }
        };

        getUsers();
    }, []);

    const getUser = async (id) => {
        try {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:4000/api/users/' + id
            });

            const user = response.data;
            setEditId(id);
            setName(user.name);
            setAge(user.age);
        } catch (error) {
            console.log(error);
        }
    };

    const createUser = async () => {
        try {
            dispatch({type: CREATE_USER_REQUEST});
            const response = await axios({
                method: 'post',
                url: 'http://localhost:4000/api/users/',
                data: {
                    name,
                    age
                },
            });

            const user = response.data;
            dispatch({
                type: CREATE_USER_SUCCESS,
                user
            });
            reset();
        } catch (error) {
            dispatch({
                type: CREATE_USER_FAILURE,
                error
            });
        }
    };

    const editUser = async () => {
        try {
            dispatch({type: EDIT_USER_REQUEST});
            const response = await axios({
                method: 'put',
                url: 'http://localhost:4000/api/users/',
                data: {
                    name,
                    age,
                    id: editId
                },
            });

            const user = response.data;
            dispatch({
                type: EDIT_USER_SUCCESS,
                user
            });
            reset();
        } catch (error) {
            dispatch({
                type: EDIT_USER_FAILURE,
                error
            });
        }
    };

    const deleteUser = async (id) => {
        dispatch({type: DELETE_USER_REQUEST});
        try {
            const response = await axios({
                method: 'DELETE',
                url: 'http://localhost:4000/api/users/' + id
            });

            const user = response.data;
            dispatch({
                type: DELETE_USER_SUCCESS,
                user
            });
        } catch (error) {
            dispatch({
                type: DELETE_USER_FAILURE,
                error
            });
        }
    };

    const reset = () => {
        setEditId(null);
        setName('');
        setAge('');
    };

    return (
        <>
            <h2>Список пользователей</h2>
            <div>
                <label>Имя:</label>
                <input value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <label>Возраст:</label>
                <input value={age} onChange={(e) => setAge(e.target.value)}/>
            </div>
            <div>
                <button onClick={editId ? editUser : createUser}>
                    Сохранить
                </button>
                <button onClick={reset}>Сбросить</button>
            </div>

            <table id='table'>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Имя</th>
                    <th>возраст</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {state.users.users.map(user => (
                    <tr key={user._id}>
                        <td style={{width: '100px'}}>{user._id}</td>
                        <td style={{width: '100px'}}>{user.name}</td>
                        <td style={{width: '100px'}}>{user.age}</td>
                        <td>
                            <button onClick={() => getUser(user._id)}>Изменить</button>
                            <button onClick={() => deleteUser(user._id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};