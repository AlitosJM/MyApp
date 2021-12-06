import React from 'react';

const Square = (props) => {
  return (
    <button
      className={props.value ? 'btn-game disabled' : 'btn-game'}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Square;