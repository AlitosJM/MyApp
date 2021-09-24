import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "./spinner.css";

export const Spinner = (props) => {
  const { promiseInProgress } = usePromiseTracker({area: props.area, delay: 0});

  return (
    promiseInProgress && (
      <div className="spinner">
        {/* {promiseInProgress ? <h3>Hey I'm a spinner loader wannabe !!!</h3>:null} */}
        <Loader type="ThreeDots" color="#4a77d4" height="100" width="100" />
      </div>
    )
  );
};

