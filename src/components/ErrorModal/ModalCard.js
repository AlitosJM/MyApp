import React from 'react';

import classes from './ModalCard.module.css';

const ModalCard = (props) => {
  return <div className={`${classes.card} ${props.className}`}>{props.children}</div>;
};

export default ModalCard;