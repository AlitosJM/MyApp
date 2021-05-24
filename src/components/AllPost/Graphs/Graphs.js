import React from 'react';

const MyGraph = ({ imageUrl }) => {
  return (
    <div className='content'>
      <div className='card'>
        <img id='grphImage' alt='img' src={imageUrl} width='500px' heigh='auto'/>
      </div>
    </div>
  );
}
export default MyGraph;