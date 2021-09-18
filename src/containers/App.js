import React from "react";
import { Switch, Route } from 'react-router-dom';
import Children from "./Children";
import Intro from "../components/Intro/Intro";
import AllPost from '../components/AllPost/AllPost';
import Detail from "../components/Detail/Detail";

import '../components/css/styles.css';

// import { Provider } from 'react-redux';
// import store from "../store/index";

// import '../components/css/main.css';
// import '../components/css/noscript.css';


const App = () => {  
  
  return (
    <React.Fragment>  
      <Switch>
        <Route exact path="/myPage" component={AllPost} />  
        <Route path="/detail/:id">
          <Children 
            className0="wrapper" 
            className1="top title" 
            idWrapper="main-navigation"
            idFooter="Myfooter"
            >
              <Detail />        
          </Children>
        </Route>
        <Route path="/" component={Intro}/>            
        

      </Switch>
    </React.Fragment>
  );
}

export default App;
