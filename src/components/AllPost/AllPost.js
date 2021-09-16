import React from "react";
import { useState, useEffect } from 'react';
import Post from './Post/Post';
import Card from './Card/Card';
import MyFom from './CsvForm/CsvForm';
import DataForm from './CsvForm/CsvForm2';
import MyGraph from './Graphs/Graphs';
import { Spinner } from './Spinner/spinner';

import { useSelector, useDispatch } from 'react-redux';

import JMAT from '../images/Jmat2.jpg';

// import '../css/main.css';
import '../css/styles.css';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';

// <Card key={post_objects[0].post_id} title={post_objects[0].title} subtitle={post_objects[0].subtitle} body={post_objects[0].body}/>

let post_objects = [];
post_objects.push(new Post(0, "Hello world!", "😄", Post.intro));
post_objects.push(new Post(1, "Hi there!", "🤖", Post.intro));
post_objects.push(new Post(2, "wanna a cookie?", "🍪", Post.intro));



const AllPost = () => {
  const [isView1, setIsView1] = useState(-1);
  const [isView2, setIsView2] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const { promiseInProgress } = usePromiseTracker(false);
  const dispatch = useDispatch();
  const status0 = useSelector(state => state.status0);
  const isView3 = useSelector(state => state.status1);
  const imageUrl1 = useSelector(state => state.url);
  document.body.className='';
  // document.querySelectorAll('style,link[rel="stylesheet"]').forEach(item => item.remove())
  // console.log(post_objects[0].title)

  const toggle = () => {
    dispatch({type:"status0"}); 
  };
  

  const onClicked = (id) => {
    setIsView1(id);
    console.log('onClicked in allpost:', id, isView1);
  }

  const MappingFunc = (post) => {
    const objPost = {id:post.post_id, title:post.title, subtitle:post.subtitle, body:post.body, fn:onClicked};
     return (
        <Card key={post.post_id} objPost = {objPost} />
     );
  }

  // function onRouteChange(e){
  //   e.preventDefault();
  //   console.log('onRouteChange');
  //   window.location.href = "/";
  // }

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
            {/* <MyFom fnt0={(isView2) => setIsView2(isView2)} fnt1={(imageUrl) => setImageUrl(imageUrl)}/>             */}
            <Spinner />
            {isView3 && <MyGraph image = {imageUrl1}/>}
          </React.Fragment>
        );
    case 2:
          return(            
            <DataForm />
          );
    default:
      return setIsView1(-1);
    }
  }


  return (
      <div className="wrapper">
        
        <header id="main-navigation"> 
            <div className="top title">              
              <h1>JMAT's Blog ☕</h1>
            </div>
        </header>

        <section id="welcome">
          <header>
            <img src={JMAT} alt="JMAT's Blog"/>
            <div className="title"><h2>Welcome</h2></div>
          </header>
        </section>
        
        {isView1===-1? 
          <div className="sub-wrapper">
            {post_objects.map(MappingFunc)}
          </div>: 
          renderSwitch(isView1)
        }        

      </div>

  );
}

export default AllPost;
