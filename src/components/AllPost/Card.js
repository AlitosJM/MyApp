import React from "react";
// import '../css/styles.css';

function Card(props) {

  return (
    <div className="content">
      <div className="card">
          <h2>{props.title}</h2>
          <p className="text">{props.subtitle}</p>
          <a href="#">Leer</a>
      </div>
    </div>
  );
}

export default Card;
