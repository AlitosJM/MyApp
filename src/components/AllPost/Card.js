import React from "react";
// import '../css/styles.css';

function Card(props) {

  const Clicked = (id) =>{
    console.log('Clicked', id);

    props.onClicked(id);
  }

  const onRouteChange = (e)=>{
    e.preventDefault();
    console.log('onRouteChange');
    window.location.href = "/";
  }

  const MyClicked  = props.onClicked;
  const id  = props.id;

  return (
    <div className="content">
      <div className="card">
          <h2>{props.title}</h2>
          <p className="text">{props.subtitle}</p>
          {/*<a href="#" onClick={onRouteChange}>RouteChange</a>*/}
          {/*<a href="#" onClick={() =>Clicked(props.id)}>Clicked1</a>*/}
          <a onClick={() =>MyClicked(id)}>Clicked2</a>
      </div>
    </div>
  );
}

export default Card;
