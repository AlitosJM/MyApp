import React from "react";
import { useCallback, useMemo } from 'react';
import post_objects from '../../components/Post/Post';
import Card from '../../components/Card/Card';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from "react-router-dom";

import JMAT from '../../images/Jmat2.jpg';
import PYTHON from '../../images/python-logo.png';

// import '../css/main.css';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

const MappingFunc = React.memo(({renderPost, myClick}) => {
  // const objPost = {id:post.post_id, image: post.image,title:post.title, subtitle:post.subtitle, body:post.body, fn:onClicked};
  console.log("renderPost");
  
  
  return post_objects.map(post => {
    const objPost = {id:post.post_id, image: post.image,title:post.title, subtitle:post.subtitle, body:post.body, fn:myClick};
    if (post.post_id<3 && renderPost===0) return <Card key={post.post_id} objPost = {objPost} />

    if(renderPost===1) return <Card key={post.post_id} objPost = {objPost} />  
  })
 
});



const PostIntro = (props) => {
  const dispatch = useDispatch();
  const status0 = useSelector(state => state.status0);
  const history = useHistory();
  // document.body.className = "";
  // document.querySelectorAll('style,link[rel="stylesheet"]').forEach(item => item.remove())
  // console.log(post_objects[0].title)

  const onClicked = (id) => {
    dispatch({type:"status0", status:id}); 
    console.log('onClicked in allpost:', id, status0);
  }

  const mystyle = {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    margin: "1rem 0.5rem auto 1rem"
  };

const introHeader = (        
  <section id="welcome">
    <header>
      <img src={JMAT} alt="JMAT's Blog"/>
      <div className="title">
        <h2>Welcome</h2>  
        <em>
          <p style={mystyle}>"Success is not final; failure is not fatal: It is the courage to continue that counts."</p> 
        </em>              
        <p style={mystyle}>Winston S. Churchill</p>           
      </div>            
    </header>          
</section>);

const introPost = useCallback( () => {  
  const styleSection = props.index_render===0 ? "latest-posts-0":"latest-posts-1";
  console.log("introPost");
  return(
  status0===-1? 
  <section id={styleSection} >
    <h2 style={mystyle}>Things I like doing...</h2>
    <div className="sub-wrapper">
      <MappingFunc renderPost={props.index_render} myClick={onClicked}/>
    </div>
  </section>
  :(
    <Redirect to={`/detail/${status0}`}/>      
  )
  );
}, [status0, props.index_render]);


  return (
    <React.Fragment>
      <div className="wrapper">
        
        <header id="main-navigation"> 
            <div className="top title">              
              <h1>JMAT's Blog ☕</h1>
            </div>
        </header>

        {props.index_render === 0? 
        <div> {introHeader}{introPost()} </div>: introPost()}

      </div>
      
      <section>
        <footer id="Myfooter">
          <p> JMAT </p>
        </footer>
      </section>

    </React.Fragment>

  );
}
// history.push(`/detail/${status0}`)

// {props.index_render === 0? introHeader: null}
// {props.index_render === 0? introPost: null}   
export default PostIntro;
