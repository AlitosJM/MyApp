import React from "react";
import {useState,useEffect} from 'react';
import Post from './Post';
import Card from './Card';

// import '../css/main.css';
import '../css/styles.css';

// <Card key={post_objects[0].post_id} title={post_objects[0].title} subtitle={post_objects[0].subtitle} body={post_objects[0].body}/>

const MappingFunc = (post) => {
   return (
      <Card key={post.post_id} title={post.title} subtitle={post.subtitle} body={post.body}/>
   );
}

let post_objects = [];
post_objects.push(new Post(0, "Hello world!", "😄", Post.intro));
post_objects.push(new Post(1, "Bye bye!", "🤖", Post.intro));

function AllPost() {
  document.body.className='';
  // document.querySelectorAll('style,link[rel="stylesheet"]').forEach(item => item.remove())

  console.log(post_objects[0].title)

  function onRouteChange(e){
    e.preventDefault();
    console.log('onRouteChange');
    window.location.href = "/";
  }

  return (
      <div className="wrapper">

        <div className="top">
          <div className="title"><h1>JMAT ☕</h1></div>
        </div>

        {post_objects.map(MappingFunc)}
        <button onClick={() => alert("Hello!")}>Say Hello</button>


      </div>
  );
}

export default AllPost;
