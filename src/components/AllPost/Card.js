import React from "react";
// import '../css/styles.css';

function Card(props) {

  const onRouteChange = (e)=>{
    e.preventDefault();
    console.log('onRouteChange');
    window.location.href = "/";
  }


  return (
    <div className="content">
      <div className="card">
          <h2>{props.title}</h2>
          <p className="text">{props.subtitle}</p>
          <a href="#" onClick={onRouteChange}>Leer</a>
      </div>
    </div>
  );
}

export default Card;
