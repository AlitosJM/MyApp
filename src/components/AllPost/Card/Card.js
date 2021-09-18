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

        <a onClick={() => objPost.fn(id)}>

          <div className="content">
            <div className="card">
              {objPost.title}
              <p className="text">{objPost.subtitle}</p>
              {objPost.body}
            </div>
          </div>

        </a>        
      </article>
    </li>
  </ul>

  );
}

export default Card;
