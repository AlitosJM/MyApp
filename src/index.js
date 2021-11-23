import React from "react";
import ReactDOM from "react-dom";
import {Route, BrowserRouter} from 'react-router-dom';
import App from './containers/MyApp/App'

import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import store from "./store/index";

const Router = function(){

  return (
    <React.StrictMode>
    <CookiesProvider>
        <BrowserRouter>        
          <Provider store={store}> 
              <App />       
          </Provider> 
        </BrowserRouter>
      </CookiesProvider>
  </React.StrictMode>
  );
}


ReactDOM.render(
  <Router />,
  document.getElementById('root')
);
