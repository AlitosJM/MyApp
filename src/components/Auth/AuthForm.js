import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Api } from '../../Api/Api';
import { trackPromise } from 'react-promise-tracker';
import { usePromiseTracker } from "react-promise-tracker";
import ErrorModal from '../ErrorModal/ErrorModal';

import { useCookies } from 'react-cookie';


const AuthForm = (props) => {
  const history = useHistory();
  const nameInputRef = useRef();
  const passwordInputRef = useRef();
  const emailInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCurrentToken, setIsCurrentToken] = useState(false);

  const [errorDisplay, setErrorDisplay] = useState(null);

  const [token, setToken] = useCookies(['mr-token']);

  const { promiseInProgress } = usePromiseTracker();

  useEffect( () => {

    const goTo = () => {
      if(token['mr-token'] && isCurrentToken) {
        history.replace('/intro');
      }
    }
    const timer = setTimeout( () => goTo(), 1000);
    return () => clearTimeout(timer);
  }, [token, isCurrentToken])
  

  const loginClicked = async (enteredName, enteredPassword, enteredEmail) => {

    try{
      await Api.loginUser({enteredName, enteredPassword, enteredEmail})
        .then( resp => {
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
    }
    catch(error){
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

  const registerClicked = async (enteredName, enteredPassword, enteredEmail) => {
    const resp = await Api.registerUser({enteredName, enteredPassword, enteredEmail})
    .catch( 
      error => {
        const isError = typeof error !== 'undefined' && "reason" in error;
        const displayError = !isError? "RegisterClicked "+`${error.name }: ${error.message}`:
        'Failed With Reason: ' + error.reason; 
        const ModalErr = {title: 'Registering Error', message: displayError};
        setErrorDisplay(ModalErr);
        setIsLoading(false);  
        setIsLogin( prevState => !prevState);
      })   
      if (!(resp instanceof Error) && typeof resp !== 'undefined'){
     
        loginClicked(enteredName, enteredPassword, enteredEmail); 
      }
      else {setIsLogin( prevState => !prevState);}

  }

  const switchAuthModeHandler = () => {
    setIsLogin( prevState => !prevState);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value.trim();
    const enteredPassword = passwordInputRef.current.value.trim();
    const enteredEmail = emailInputRef.current.value.trim();

    setIsLoading(true);
    setIsCurrentToken(false);

    if (isLogin){
      trackPromise(
        loginClicked(enteredName, enteredPassword, enteredEmail)
      );
    }
    else{
      trackPromise(
        registerClicked(enteredName, enteredPassword, enteredEmail)
      );

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
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' required ref={emailInputRef}/>
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
