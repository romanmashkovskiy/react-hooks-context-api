import React, {useEffect} from 'react';
import axios from 'axios';
import Child from './Child';
import {useStateValue} from './StateProvider';

export default () => {
    const [state, dispatch] = useStateValue();

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            const response = await axios('https://dog.ceo/api/breeds/image/random');
            const dog = response.data.message;

            if (!ignore) {
                dispatch({
                    type: 'picture_add',
                    picture: dog
                })
            }
        }

        fetchData();
    }, []);


    return (
        <div>
            <h1>Parent</h1>
            {state.picture && (
                <div>
                    <img src={state.picture} alt={'statePicture'} style={{width: '200px', height: '200px'}}/>
                </div>
            )}
            <div>
            </div>
            <Child/>
        </div>
    );
};