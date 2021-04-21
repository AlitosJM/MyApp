import React from "react";
import '../css/styles.css';

function Card(props) {

  return (
    <div className="content">
      <div className="card">
          <h1>{props.title}</h1>
          <h2>{props.subtitle}</h2>
          <p>{props.body}</p>
      </div>
    </div>
  );
}

export default Card;
