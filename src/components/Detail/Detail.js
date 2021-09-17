import React from "react";
import MyFom from '../AllPost/CsvForm/CsvForm';
import DataForm from '../AllPost/CsvForm/CsvForm2';
import { Spinner } from '../AllPost/Spinner/spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

const Detail = props => {
    const id = useSelector(state => state.status0);
    const isView = useSelector(state => state.status1);
    const imageUrl = useSelector(state => state.url);
    const dispatch = useDispatch();
    const history = useHistory();

    const renderSwitch = (id) => {
        switch(id) {
          case 0:
            return(
              <div>
                <h1>Hi</h1>
                <button onClick={() => alert("Hello!")}>Say Hello</button>
              </div>
            );
          case 1:
              return (
                <React.Fragment>
                  <MyFom />                  
                  <Spinner />
                  {isView && <MyGraph image={imageUrl}/>}
                </React.Fragment>
              );
          case 2:
                return(            
                  <DataForm />
                );
          default:
            // dispatch({type:"status0", status:-1}); 
            // history.push("/Detail");   
            return <React.Fragment>
              <MyFom />                  
              <Spinner />
              {isView && <MyGraph image={imageUrl}/>}
            </React.Fragment>
          }
        }
    
    return (
        renderSwitch(id)
    )
};

export default Detail;