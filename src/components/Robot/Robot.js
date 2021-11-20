import React from 'react';

const Robot = () => {
    return(
        <div className={"robots"}>
          <div className={"android"}>
            <div className={"head eyes"}>
              <div className={"left_eye"} />
              <div className={"right_eye"}/>
            </div>
            <div className={"upper_body"}>
              <div className={"left_arm"} />
              <div className={"torso"}/>
              <div className={"right_arm"}/>
            </div>
            <div className={"lower_body"}>
              <div className={"left_leg"} /> 
              <div className={"right_leg"} />                 
            </div>
          </div>
        </div>
      );
}

export default Robot;
