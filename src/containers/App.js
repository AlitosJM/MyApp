import React from "react";
import { Route } from 'react-router-dom';
import Intro from "../components/Intro/Intro";
import AllPost from '../components/AllPost/AllPost';

import { Provider } from 'react-redux';
import store from "../store/index";
// import '../components/css/main.css';
// import '../components/css/noscript.css';


const App = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Route exact path="/" component={Intro}/>
        <Route exact path="/MyPage" component={AllPost}/>
      </Provider>
    </React.Fragment>
  );
}

export default App;
