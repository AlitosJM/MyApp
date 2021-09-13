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
    <div className="content">
      <div className="card">
          <h2>{objPost.title}</h2>
          <p className="text">{objPost.subtitle}</p>
          {/*<a href="#" onClick={onRouteChange}>RouteChange</a>*/}
          {/*<a href="#" onClick={() =>Clicked(props.id)}>Clicked1</a>*/}
          {/* <a onClick={() =>onClicked(id)}>Clicked2</a> */}
          <a onClick={() =>objPost.fn(id)}>Clicked2</a>
      </div>
    </div>
  );
}

export default Card;
