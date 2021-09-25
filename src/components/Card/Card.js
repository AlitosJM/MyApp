import React from "react";
import {default as Wrapper} from "./LinkTo";
// import '../css/styles.css';

function Card({objPost}) {
  const id  = objPost.id;

  const onClicked = () =>{
    console.log('Clicked', id);
    objPost.fn(id);
  }

  return (    
  <ul>
    <li>
      <article className="post">  
          {/* <div className="content"> */}
          {/* <a onClick={()=>onClicked(id)}> */}
          {/* <Wrapper value={id} onClicked={onClicked}> */}
          <a onClick={onClicked}>
            <div className="card">              
                <h3>{objPost.title}</h3>
                <p className="text">{objPost.subtitle}</p>
                {objPost.body}              
            </div>
          </a>
          {/* </Wrapper> */}
          {/* </a> */}
          {/* </div> */}
               
      </article>
    </li>
  </ul>

  );
}

export default Card;
