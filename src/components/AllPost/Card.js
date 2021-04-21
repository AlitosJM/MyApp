import React from "react";
import '../css/styles.css';

function Card(props) {

  return (
    <div className="content">
      <div className="card">
        <div key={props.post_id}>
          <h1>{props.title}</h1>
          <h2>{props.subtitle}</h2>
          <p>{props.body}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
