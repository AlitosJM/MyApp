import React, { useState, useRef, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Api } from '../../Api/Api';

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
  

  const loginClicked = () => {
    const enteredName = nameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    Api.loginUser({enteredName, enteredPassword})
      .then( resp => {
        setToken('mr-token', resp.token);
        setIsCurrentToken(true);})
      .catch( error => console.log(error))
    // history.replace('/');    
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
      loginClicked();
    }
    else{
      // dispatch(registerUser( {enteredEmail, enteredPassword} ));
      console.log(enteredName, enteredPassword);
      Api.registerUser({enteredName, enteredPassword})
      .then( () => loginClicked())
      .catch( error => console.log(error))

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
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
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
    </section>
  )
}

export default AuthForm;
