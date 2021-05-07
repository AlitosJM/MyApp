import React from "react";
import {useState,useEffect} from 'react';
import Post from './Post';
import Card from './Card';
import MyFom from './CsvForm';
import DataForm from './CsvForm2';

// import '../css/main.css';
import '../css/styles.css';

// <Card key={post_objects[0].post_id} title={post_objects[0].title} subtitle={post_objects[0].subtitle} body={post_objects[0].body}/>

let post_objects = [];
post_objects.push(new Post(0, "Hello world!", "😄", Post.intro));
post_objects.push(new Post(1, "Bye bye!", "🤖", Post.intro));
post_objects.push(new Post(2, "Bye bye!", "🤖", Post.intro));



function AllPost() {
  const [isView1, SetIsView1] = useState(-1);
  document.body.className='';
  // document.querySelectorAll('style,link[rel="stylesheet"]').forEach(item => item.remove())
  // console.log(post_objects[0].title)

  const MappingFunc = (post) => {
     return (
        <Card key={post.post_id} id={post.post_id} title={post.title} subtitle={post.subtitle} body={post.body} onClicked ={onClicked} />
     );
  }

  // function onRouteChange(e){
  //   e.preventDefault();
  //   console.log('onRouteChange');
  //   window.location.href = "/";
  // }

  const onClicked = (id) => {
    SetIsView1(id)
    console.log('onClicked in allpost:', id, isView1);
  }

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
            <MyFom />
        );
    case 2:
          return(
            <DataForm />
          );
    default:
      return SetIsView1(-1);
    }
  }


  return (
      <div className="wrapper">

        <div className="top">
          <div className="title"><h1>JMAT ☕</h1></div>
        </div>

        <div className="sub-wrapper">
          { isView1===-1? post_objects.map(MappingFunc) : renderSwitch(isView1) }
        </div>

      </div>

  );
}

export default AllPost;
