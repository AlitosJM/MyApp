import React from 'react';

const MyGraph = (props) => {
  return (    
    <div className=''>
      <div className='card'>
        <img id='grphImage' alt='img' src={props.image} width="100%" height="100%"/>
      </div>
    </div>
  );
}
export default MyGraph;