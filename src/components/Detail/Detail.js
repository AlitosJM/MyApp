import React from "react";
import MyFom from '../CsvForm/CsvForm';
import DataForm from '../CsvForm/CsvForm2';
import MyGraph from '../Graphs/Graphs';
import { Spinner } from '../Spinner/spinner';
import post_objects from "../Post/Post";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, Redirect } from "react-router-dom";

const Detail = props => {
    const isView = useSelector(state => state.status1);
    const imageUrl = useSelector(state => state.url);
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();   
    const postId = +params.id; 

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
            console.log("detail default");
            return <Redirect to="/myPage"/>
            // dispatch({type:"status0", status:-1}); 
            // history.push("/Detail");   
            // return <React.Fragment>
            //   <MyFom />                  
            //   <Spinner />
            //   {isView && <MyGraph image={imageUrl}/>}
            // </React.Fragment>
          }
        }
    
    return (
      <React.Fragment>
        <section id="summary">
          <h2>{post_objects[postId].title}</h2>
          <article>
            <img src={post_objects[postId].image} alt="post-image" />
            <address> 
              Por <a href="mailto:jose.ali.toscano@hotmail.com">José Miguel Alí Toscano</a>
            </address>
          </article>
        </section>        

        <main>
          <p> This is a test</p>
          <p> This is a test</p>
        </main>

        {renderSwitch(postId)}
      </React.Fragment>
    );
};

export default Detail;