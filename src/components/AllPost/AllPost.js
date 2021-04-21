import React from "react";
import {useState,useEffect} from 'react';
import Post from './Post';
import Card from './Card';
import '../css/styles.css';

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

  console.log(post_objects[0].title)

  return (
      <div className="wrapper">

        <div className="top">
          <div className="title"><h1>JMAT ☕</h1></div>
        </div>

        {post_objects.map(MappingFunc)}

      </div>
  );
}

export default AllPost;
