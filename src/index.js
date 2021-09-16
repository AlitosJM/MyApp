import React from "react";
import ReactDOM from "react-dom";
import {Route, BrowserRouter} from 'react-router-dom';
import AllPost from './components/AllPost/AllPost';
import App from './containers/App';
import { Provider } from 'react-redux';
import store from "./store/index";

// function Router(){

//   return (
//     <React.StrictMode>
//       <Provider store={store}>
//         <BrowserRouter>
//           <Route exact path="/" component={App}/>
//           <Route exact path="/MyPage" component={AllPost}/>
//         </BrowserRouter>
//         </Provider>
//     </React.StrictMode>
//   )
// }

// ReactDOM.render(<Router />, document.getElementById("root"));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
