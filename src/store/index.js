import {createStore} from 'redux';

const initialState = {status0: false};

const myReducer = (state = initialState, action) => {
    if (action.type==="status0")
    {        
        return {
            status0: !state.status0? true:false
        };
    }
    return state;
};

const store = createStore(myReducer);
export default store;