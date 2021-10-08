import React from "react";
import ReactDOM from "react-dom";
import {Route, BrowserRouter} from 'react-router-dom';
import App from './containers/MyApp/App'

import { Provider } from 'react-redux';
import store from "./store/index";



ReactDOM.render(
  <React.StrictMode>    
      <BrowserRouter>        
        <Provider store={store}> 
            <App />       
        </Provider> 
      </BrowserRouter>    
  </React.StrictMode>,
  document.getElementById('root')
);
