import { createStore } from 'redux';

const initialState = {status0: -1, status1: false, url:""};

const myReducer = (state = initialState, action) => {
    if (action.type==="status0")
    {        
        return {
            status0: action.status,
            status1: state.status1,
            url: state.url
        };
    }
    if (action.type==="status1")
    {        
        return {
            status0: state.status0,
            status1: action.status? true:false,
            url: state.url
        };
    }
    if (action.type==="setUrl")
    {        
        return {
            status0: state.status0,
            status1: state.status1,
            url: action.url
        };
    }
    return state;
};

const store = createStore(myReducer);
export default store;