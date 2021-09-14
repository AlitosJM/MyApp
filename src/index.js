import React from "react";
import ReactDOM from "react-dom";
import {Route,BrowserRouter} from 'react-router-dom';
import AllPost from './components/AllPost/AllPost';
import App from './containers/App';
import { Provider } from 'react-redux';
import store from "./store/index";

function Router(){

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Route exact path="/" component={App}/>
          <Route exact path="/MyPage" component={AllPost}/>
        </BrowserRouter>
        </Provider>
    </React.StrictMode>
  )
}

ReactDOM.render(<Router />, document.getElementById("root"));
// ReactDOM.render(<h1>React</h1>, document.querySelector(".welcome-back"));

//5. Create a Note.jsx component to show a <div> element with a
//<h1> for a title and a <p> for the content.
//6. Make sure that the final website is styled like the example shown here:
//https://w00gz.csb.app/

//HINT: You will need to study the classes in teh styles.css file to appy styling.
