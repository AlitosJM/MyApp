import React from "react";
import {useState,useEffect} from 'react';

function Intro() {

  // useEffect( () => {
  //   // console.log(token);
  //   window.location.href ='/';
  // },[])
  const onRouteChange = (e) =>{
    e.preventDefault();
    console.log('onRouteChange');
    window.location.href = "/MyPage";
  }
  return (
    <div className="is-preload">

      <div id="wrapper">
        <section id="main">

          <header>
            <span className="avatar"><img src="Jmat2.jpg" alt="" /></span>
            <h1><em>@liTos</em></h1>
            <p>Ing. Electrónico</p>
          </header>

          <footer>
            <ul className="icons">
              <li><a href="#" onClick={onRouteChange} className="icon solid fa-robot">Robot</a></li>
              {/*<button className="icon solid fa-robot">Robot</button>*/}
            </ul>
          </footer>

        </section>

        <footer id="footer">
          <ul className="copyright">
            <li>&copy; JMAT </li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
          </ul>
        </footer>
      </div>

    </div>
  );
}

export default Intro;
