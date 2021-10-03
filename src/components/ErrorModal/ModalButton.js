import React from 'react';

import classes from './ModalButton.module.css';

const ModalButton = (props) => {
  return (
    <button
      className={classes.button}
      type={props.type || 'button'}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default ModalButton;