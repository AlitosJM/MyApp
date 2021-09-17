import React from "react";
import { Route } from 'react-router-dom';
import Children from "./Children";
import Intro from "../components/Intro/Intro";
import AllPost from '../components/AllPost/AllPost';
import Detail from "../components/Detail/Detail";

import { Provider } from 'react-redux';
import store from "../store/index";
// import '../components/css/main.css';
// import '../components/css/noscript.css';


const App = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Route exact path="/" component={Intro} />
        <Route exact path="/MyPage" component={AllPost} />
        <Route exact path="/Detail">
          <Children className0="wrapper" className1="top title" idWrapper="main-navigation">
            <Detail />        
          </Children>
        </Route>
      </Provider>
    </React.Fragment>
  );
}

export default App;
