import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

const Spinner = (props) => {
  const { promiseInProgress } = usePromiseTracker({area: props.area, delay: 0});

  return (
    promiseInProgress && (
      <div className="spinner">
        <Loader type="ThreeDots" color="#4a77d4" height="100" width="100" />
      </div>
    )
  );
};

export default Spinner;

