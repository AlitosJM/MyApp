import React from "react";

const LinkTo = (props) => {

    const auxiliarClick = () => {
        props.onClicked(props.value)
    };

    return(
        <div onClick={auxiliarClick} >
            {props.children}
        </div >
    );

}

export default LinkTo;