import React, { useState, useRef, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Api } from '../../Api/Api';

import { Spinner } from '../Spinner/spinner';

// import { registerUser } from '../../store';
import { useCookies } from 'react-cookie';

const AuthForm = (props) => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const nameInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isCurrentToken, setIsCurrentToken] = useState(false);

  const [token, setToken] = useCookies(['mr-token']);

  useEffect( () => {
    if(token['mr-token'] && isCurrentToken) {
      console.log(token, token['mr-token'],"token")
      history.replace('/intro');
    //window.location.href = '/allPost';
    }
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
      const isObj = typeof error !== 'undefined' && "reason" in error;
      !isObj? console.error("loginClicked "+ error.name + ': ' + error.message)  :
      console.log(`loginClicked Failed with reason: ${error.reason}`);  
      setIsLogin(true);
      setIsLoading(false);
      setIsCurrentToken(false);
    }
    // history.replace('/');    
  }

  const registerClicked = async (enteredName, enteredPassword) => {
    const resp = await Api.registerUser({enteredName, enteredPassword})
    .catch( 
      error => {
        const isObj = typeof error !== 'undefined' && "reason" in error;
        console.log("obj", isObj);
        !isObj? console.log("registerClicked ", `${error.name }: ${error.message}`):
        console.log(`Failed with reason: ${error.reason}`); 
        setIsLoading(false);  
        setIsLogin( prevState => !prevState);
      })   
      console.log("After catch() ", resp);
      if (!(resp instanceof Error) && typeof resp !== 'undefined'){
        console.log("Resp is not an error: ", resp);
        loginClicked(enteredName, enteredPassword); 
      }
      else {setIsLogin( prevState => !prevState);}
      console.log("After checking out the error");

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
      loginClicked(enteredName, enteredPassword);
    }
    else{
      // dispatch(registerUser( {enteredEmail, enteredPassword} ));
      console.log(enteredName, enteredPassword);
      registerClicked(enteredName, enteredPassword)
      // await Api.registerUser({enteredName, enteredPassword})
      // .then( () => loginClicked())
      // .catch( error => console.log(error))

    }
  }

  return (
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
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
      <Spinner />
    </section>
  )
}
// className = "btn btn-primary btn-block btn-large"
// <button className="btn btn-primary btn-large">{isLogin ? 'Login' : 'Create Account'}</button>
export default AuthForm;
