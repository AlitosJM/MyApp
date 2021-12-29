import React from "react";
import { Switch, Route } from 'react-router-dom';
import Wrapper from "../Wrapper/Wrapper";
import Intro from "../../components/Intro/Intro";
import PostIntro from '../PostIntro/PostIntro';
import Detail from "../../components/Detail/Detail";
import AuthForm from "../../components/Auth/AuthForm";
import Spinner from "../../components/Spinner/spinner";

import '../../css/main.css';

const App = () => {    
  return (
    <React.Fragment>  
      <Switch>
        <Route path="/intro" exact render={
          (routeProps) => <PostIntro index_render={0} {...routeProps}/>} />
        <Route path="/allPost" exact render={
          (routeProps) => <PostIntro index_render={1} {...routeProps}/>} /> 
        <Route path="/detail/:id">
          <Wrapper >
            <Detail />        
          </Wrapper>
        </Route>
        <Route path="/user" >
          <Wrapper>
            <AuthForm />
            <Spinner />
          </Wrapper>
        </Route>
        <Route path="/" component={Intro}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
