import React from "react";
// import '../css/styles.css';

function Card({objPost}) {

  const Clicked = (id) =>{
    console.log('Clicked', id);
    onClicked(id);
  }

  const onRouteChange = (e)=>{
    e.preventDefault();
    console.log('onRouteChange');
    window.location.href = "/";
  }

  const id  = objPost.id;

  return (    
  <ul>
    <li>
      <article className="post">        

          {/* <div className="content"> */}
          <a onClick={() => objPost.fn(id)}>
            <div className="card">              
                <h3>{objPost.title}</h3>
                <p className="text">{objPost.subtitle}</p>
                {objPost.body}              
            </div>
          </a> 
          {/* </div> */}
               
      </article>
    </li>
  </ul>

  );
}

export default Card;
