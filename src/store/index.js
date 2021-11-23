import { createStore } from 'redux';
// import { Api } from '../Api/Api';

const initialState = { 
    status0: -1, status1: false, url:"", obj0:{},
};

// const initialState = { 
//     status0: -1, status1: false, url:"", obj0:{},
//     userSignin: {
//         userInfo: localStorage.getItem('userInfo')
//           ? JSON.parse(localStorage.getItem('userInfo'))
//           : null,
//       }
// };

// export const registerUser = ({enteredEmail, enteredPassword}) => 
//     async(dispatch, getState) => {
//         Api.registerUser({enteredEmail, enteredPassword});

//         localStorage.setItem('userInfo', JSON.stringify(data))
//         .then( () => loginClicked())
// }

const myReducer = (state = initialState, action) => {
    if (action.type==="status0")
    {        
        return {
            status0: action.status,
            status1: state.status1,
            url: state.url,
            obj0: action.obj
        };
    }
    if (action.type==="status1")
    {        
        return {
            status0: state.status0,
            status1: action.status? true:false,
            url: state.url,
            obj0: action.obj
        };
    }
    if (action.type==="setUrl")
    {        
        return {
            status0: state.status0,
            status1: state.status1,
            url: action.url,
            obj0: action.obj
        };
    }
    if (action.type==="setObj0")
    {        
        return {
            ...state,
            obj0: action.obj
        };
    }
    // if (action.type==="register")
    // {        
    //     return {
    //         ...state,
    //         obj0: action.obj
    //     };
    // }
    return state;
};

// const store = createStore(myReducer, initialState);
const store = createStore(myReducer);
export default store;