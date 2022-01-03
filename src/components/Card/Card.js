import React from "react";
import {default as Wrapper} from "./LinkTo";
import PYTHON from '../../images/python-logo.png';


function Card({objPost}) {
  const id  = objPost.id;

  const onClicked = () =>{
    objPost.func(id);
  }

  return (    
  <ul>
    <li>
      <article className="post">  

          <a onClick={onClicked}>
            <div className="card">          
              <img className="miniature"src={objPost.image} alt="post-image" />
              <h3>{objPost.title} {objPost.subtitle} </h3>
              <p className="text"> {objPost.body}  </p>                           
            </div>
          </a>
               
      </article>
    </li>
  </ul>

  );
}

export default Card;
