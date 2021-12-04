import React from "react";
import {default as Wrapper} from "./LinkTo";
import PYTHON from '../../images/python-logo.png';
// import '../css/styles.css';

function Card({objPost}) {
  const id  = objPost.id;

  const onClicked = () =>{
    console.log('Clicked', id);
    objPost.func(id);
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
              <img  className="miniature"src={objPost.image} alt="post-image" />
              <h3>{objPost.title} {objPost.subtitle} </h3>
              <p className="text"> {objPost.body}  </p>                           
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
