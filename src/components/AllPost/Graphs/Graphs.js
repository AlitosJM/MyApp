import React from 'react';

const MyGraph = (props) => {
  const urlDummy = "https://www.intermediae.es/sites/default/files/activity/image/1%20-%20totoro.jpg"
  console.log("MyGraph",props.image)
  return (    
    <div className='content'>
      <div className='card'>
        <img id='grphImage' alt='img' src={props.image} width="100%" height="100%"/>
      </div>
    </div>
  );
}
export default MyGraph;