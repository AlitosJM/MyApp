import React from "react";
import ReactDOM from "react-dom";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import JMAT from '../../images/Jmat2.jpg';


import './main.css';
// import classes from'./main.module.css';

// import '../css/main.css';
// import '../css/noscript.css';
// https://embed.plnkr.co/eoa4QEp6b83L9Ky3F3Tj/
// document.getElementsByTagName("BODY")[0].className
// document.body.className = "";
// icon brands fa-python

function PortalToIntro() {

  useEffect( () => {
    if ('addEventListener' in window) {
      console.log('addEventListener');
      window.addEventListener('load', () => { document.getElementsByTagName("BODY")[0].className = document.getElementsByTagName("BODY")[0].className.replace(/\bis-preload\b/, ''); });
      document.getElementsByTagName("BODY")[0].className += (navigator.userAgent.match(/(MSIE|rv:11\.0)/) ? 'is-ie' : '');
      console.log(document.getElementsByTagName("BODY")[0].className);
    }

  },[])

  return (

      <div id={"wrapper"}>
        <section id={"main"}>

          <header id={"myHeader"}>
            <span className={"avatar"}>
              <img src={JMAT} alt="JMAT" />
            </span>
            <h1><em>@liTos</em></h1>
            <p>Ing. Electrónico</p>
          </header>

          <footer>
            <ul className={"icons"}>
              <li><Link className={"icon solid fa-rocket"} to="/intro">Robot</Link></li>
            </ul>
          </footer>

        </section>

        <footer id={"footer"}>
          <ul className={"copyright"}>
            <li>&copy; JMAT </li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
          </ul>
        </footer>
      </div>

  );
}

const Intro = () =>{
  return(
    <React.Fragment>
      {ReactDOM.createPortal(<PortalToIntro />, document.getElementById('intro'))}
    </React.Fragment>
  );

}


export default Intro;
