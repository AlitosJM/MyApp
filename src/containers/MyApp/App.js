import React from "react";
import { Switch, Route } from 'react-router-dom';
import Wrapper from "../Wrapper/Wrapper";
import Intro from "../../components/Intro/Intro";
import AllPost from '../../components/AllPost/AllPost';
import Detail from "../../components/Detail/Detail";

import './styles.css';

// import { Provider } from 'react-redux';
// import store from "../store/index";

// import '../components/css/main.css';
// import '../components/css/noscript.css';


const App = () => {  
  
  return (
    <React.Fragment>  
      <Switch>
        <Route path="/myPage" exact component={AllPost} />  
        <Route path="/detail/:id">
          <Wrapper >
              <Detail />        
          </Wrapper>
        </Route>
        <Route path="/" component={Intro}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
