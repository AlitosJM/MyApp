import React from "react";
import { useState, useEffect } from 'react';
import Post from '../../components/Post/Post';
import Card from '../../components/Card/Card';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from "react-router-dom";

import JMAT from '../../images/Jmat2.jpg';

// import '../css/main.css';

import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

// <Card key={post_objects[0].post_id} title={post_objects[0].title} subtitle={post_objects[0].subtitle} body={post_objects[0].body}/>

let post_objects = [];
post_objects.push(new Post(0, "Hello world!", "😄", Post.intro));
post_objects.push(new Post(1, "Hi there!", "🤖", Post.intro));
post_objects.push(new Post(2, "Wanna a cookie?", "🍪", Post.intro));


const AllPost = () => {
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

  const MappingFunc = (post) => {
    const objPost = {id:post.post_id, title:post.title, subtitle:post.subtitle, body:post.body, fn:onClicked};
     return (
        <Card key={post.post_id} objPost = {objPost} />
     );
  }

  const mystyle = {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    margin: "1rem 0.5rem auto 1rem"
  };


  return (
    <React.Fragment>
      <div className="styles.wrapper">
        
        <header id="main-navigation"> 
            <div className="top title">              
              <h1>JMAT's Blog ☕</h1>
            </div>
        </header>

        <section id="welcome">
          <header>
            <img src={JMAT} alt="JMAT's Blog"/>
            <div className="title">
              <h2>Welcome</h2>  
              <p style={mystyle}>"Success is not final; failure is not fatal: It is the courage to continue that counts."</p> 
              <p style={mystyle}>Winston S. Churchill</p>           
            </div>            
          </header>
          
        </section>
        
        {status0===-1? 
          <section id="latest-posts">
            <h2 style={mystyle}>Things I like doing...</h2>
            <div className="sub-wrapper">
              {post_objects.map(MappingFunc)}
            </div>
          </section>
          :(
            <Redirect to={`/detail/${status0}`}/>
            
          )
        }
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
export default AllPost;
