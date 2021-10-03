import React from 'react';
import ReactDOM from 'react-dom';

import ModalCard from './ModalCard';
import ModalButton from './ModalButton';

import classes from './ErrorModal.module.css';

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm} />;
};
  
const ModalOverlay = (props) => {
    return (
        <ModalCard className={classes.modal}>
        <header className={classes.header}>
            <h2>{props.title}</h2>
        </header>
        <div className={classes.content}>
            <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
            <ModalButton onClick={props.onConfirm}>Ok</ModalButton>
        </footer>
        </ModalCard>
    );
};
  
const ErrorModal = (props) => {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          <Backdrop onConfirm={props.onConfirm} />,
          document.getElementById('backdrop-root')
        )}
        {ReactDOM.createPortal(
          <ModalOverlay
            title={props.title}
            message={props.message}
            onConfirm={props.onConfirm}
          />,
          document.getElementById('overlay-root')
        )}
      </React.Fragment>
    );
  };
  
  export default ErrorModal;