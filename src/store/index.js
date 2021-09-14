import {createStore} from 'redux';

const initialState = {status0: false, status1: false};

const myReducer = (state = initialState, action) => {
    if (action.type==="status0")
    {        
        return {
            status0: !state.status0? true:false
        };
    }
    if (action.type==="status1")
    {        
        return {
            status1: !state.status1? true:false
        };
    }
    return state;
};

const store = createStore(myReducer);
export default store;