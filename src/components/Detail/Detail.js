import React from "react";
import MyFom from '../CsvForm/CsvForm';
import DataForm from '../CsvForm/CsvForm2';
import MyGraph from '../Graphs/Graphs';
import Canvas from "../Canvas/Canvas";
import CanvasForCtx from "../Canvas/CanvasForCtx";
import { CanvasProvider } from "../../containers/CanvasContext/CanvasContext";
import { ContextualComponent } from "../../containers/Wrapper/ContextualComponent";
import Spinner from '../Spinner/spinner';
import post_objects from "../Post/Post";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useCookies } from 'react-cookie';

import Latex from "react-latex-next";
import "katex/dist/katex.min.css";
import Robot from "../Robot/Robot";
import Game from "../Game/Game";

const Detail = props => {
    const isView = useSelector(state => state.status1);
    const imageUrl = useSelector(state => state.url);
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();   
    const postId = +params.id; 
    // const myDate = new Date().toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' });
    const myDate =new Date("October 6, 2021").toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' });
    const [token, setToken, deleteToken] = useCookies(['mr-token']);
    
    const renderSwitch = (id) => {
        switch(id) {
          case 0:
            return <Robot />;
          case 1:
              return (
                <React.Fragment>
                  <MyFom token={token['mr-token']}/>                  
                  <Spinner />
                  {isView && <MyGraph image={imageUrl}/>}
                </React.Fragment>
              );
          case 2:
                return(            
                  // <DataForm />
                  <Game></Game>
                );
          case 3:
            // return <Canvas />
            return (<CanvasProvider>
                      <CanvasForCtx />
                    </CanvasProvider>);
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
    
    const renderParagraphs = (
      post_objects[postId].latex?
      (<div>        
        <Latex>{post_objects[postId].parag0}</Latex>
      </div>)
    : (<div>
        <ContextualComponent html={post_objects[postId].parag0} />
      </div>)
    );
    
    return (
      <React.Fragment>
        <section id="summary">
          <h2>{post_objects[postId].title}</h2>
          <article>
            <img src={post_objects[postId].image} alt="post-image" />
            <address> 
              By <a href="mailto:jose.ali.toscano@hotmail.com">José Miguel Alí Toscano</a>
            </address>
            <div>
              Updated: 
              <time>{myDate}</time>
            </div>
          </article>

        </section>        

        <main>
          {renderParagraphs}
        </main>

        {renderSwitch(postId)}
      </React.Fragment>
    );
};

export default Detail;