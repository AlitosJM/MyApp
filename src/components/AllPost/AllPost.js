import React from "react";
import {useState,useEffect} from 'react';
import Post from './Post';
import '../css/styles.css';

const MappingFunc = (post) => {
   return (
     <div key={post.post_id}>
       <h1>{post.title}</h1>
       <h2>{post.subtitle}</h2>
       <p>{post.body}</p>
     </div>
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

        <div className="content">
          <div className="card">
            {post_objects.map(MappingFunc)}

          </div>
        </div>

      </div>
  );
}

export default AllPost;
