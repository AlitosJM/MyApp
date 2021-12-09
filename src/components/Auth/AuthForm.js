import React, { useState, useRef, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Api } from '../../Api/Api';
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import { Spinner } from '../Spinner/spinner';
import ErrorModal from '../ErrorModal/ErrorModal';

// import { registerUser } from '../../store';
import { useCookies } from 'react-cookie';

// const areas = {
//   spinner3: 'spinner3-area',
//   spinner4: 'spinner4-area',
// };

const AuthForm = (props) => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const nameInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCurrentToken, setIsCurrentToken] = useState(false);

  const [errorDisplay, setErrorDisplay] = useState(null);

  const [token, setToken] = useCookies(['mr-token']);

  const { promiseInProgress } = usePromiseTracker();

  useEffect( () => {

    const goTo = () => {
      if(token['mr-token'] && isCurrentToken) {
        console.log(token, token['mr-token'],"token")
        history.replace('/intro');
      //window.location.href = '/allPost';
      }
    }
    const timer = setTimeout( () => goTo(), 1000);
    return () => clearTimeout(timer);
  }, [token, isCurrentToken])
  

  const loginClicked = async (enteredName, enteredPassword) => {

    try{
      await Api.loginUser({enteredName, enteredPassword})
        .then( resp => {
          console.log(".then Api.loginUser", resp)
          if ("token" in resp){
            setToken('mr-token', resp.token);
            setIsCurrentToken(true);
          }
          else{
            setIsLogin(true);
            setIsLoading(false);
            setIsCurrentToken(false);
          }
        })
        console.log("After .then Api.loginUser")
    }
    catch(error){
      console.log(error.message)
      const isError = typeof error !== 'undefined' && "reason" in error;
      const displayError = !isError? "LoginClicked "+ error.name + ': ' + error.message:
      `LoginClicked Failed With Reason: ${error.reason}`;  
      const ModalErr = {title: 'Logging Error', message: displayError};
      setErrorDisplay(ModalErr);
      setIsLogin(true);
      setIsLoading(false);
      setIsCurrentToken(false);
    }
    // areas.spinner3;
    // history.replace('/');    
  }

  const registerClicked = async (enteredName, enteredPassword) => {
    const resp = await Api.registerUser({enteredName, enteredPassword})
    .catch( 
      error => {
        const isError = typeof error !== 'undefined' && "reason" in error;
        console.log("isError", isError);
        const displayError = !isError? "RegisterClicked "+`${error.name }: ${error.message}`:
        'Failed With Reason: ' + error.reason; 
        const ModalErr = {title: 'Registering Error', message: displayError};
        setErrorDisplay(ModalErr);
        setIsLoading(false);  
        setIsLogin( prevState => !prevState);
      })   
      console.log("After catch() ", resp, !(resp instanceof Error) && typeof resp !== 'undefined');
      if (!(resp instanceof Error) && typeof resp !== 'undefined'){
        console.log("Resp is not an error: ", resp);
        loginClicked(enteredName, enteredPassword); 
      }
      else {setIsLogin( prevState => !prevState);}
      console.log("After checking out the error");
      // areas.spinner4;
  }

  const switchAuthModeHandler = () => {
    setIsLogin( prevState => !prevState);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    setIsCurrentToken(false);

    if (isLogin){
      trackPromise(
        loginClicked(enteredName, enteredPassword)
      );
    }
    else{
      // dispatch(registerUser( {enteredEmail, enteredPassword} ));
      console.log(enteredName, enteredPassword);
      trackPromise(
        registerClicked(enteredName, enteredPassword)
      );
      // await Api.registerUser({enteredName, enteredPassword})
      // .then( () => loginClicked())
      // .catch( error => console.log(error))
    }
  }

  const errorHandler = () => {setErrorDisplay(null)};

  

  return (
    <>
      {errorDisplay && <ErrorModal title={errorDisplay.title} message={errorDisplay.message} onConfirm={errorHandler} />}
      <section className={"auth"}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler}>
          <div className={"control"}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' required ref={nameInputRef}/>
          </div>
          <div className={"control"}>
            <label htmlFor='password'>Your Password</label>
            <input type='password' id='password' required ref={passwordInputRef}/>
          </div>
          <div className={"actions"}>
            {!isLoading && <button type="submit" className="btn btn-primary btn-large" >{isLogin ? 'Login' : 'Create Account'}</button>}
            {isLoading && <p>Sending request...</p>}
            <button
              type='button'
              className={"toggle"}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? !promiseInProgress && 'Create new account' : !promiseInProgress && 'Login with existing account'}
            </button>
          </div>
        </form>
      </section>
    
    </>
  )
}
// className = "btn btn-primary btn-block btn-large"
// <button className="btn btn-primary btn-large">{isLogin ? 'Login' : 'Create Account'}</button>
export default AuthForm;
