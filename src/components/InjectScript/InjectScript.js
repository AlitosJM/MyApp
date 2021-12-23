import React from 'react';
// https://stackoverflow.com/questions/49777780/can-anybody-generate-opencv-js

const InjectScript = (scriptId, scriptLink) =>
  new Promise((resolve, reject) => {
    const existingscript = document.getElementById(scriptId);
    let cv;
    if (!existingscript) {
      const script = document.createElement('script');
      script.setAttribute('async', '');
      script.setAttribute('id', scriptId);
      script.setAttribute('type', 'text/javascript');
      script.addEventListener('load', () => {
        if (resolve) {
          console.log('resolve 1: ');
          console.log("script.onload 1: ", window.cv);
          resolve();          
        }
      });
      script.addEventListener('error', e => {
        if (reject) {
          reject(e);
        }
      });
      console.log('After addEventListeners');
      script.src = scriptLink;
      const node = document.getElementsByTagName('script')[0]; // <script src="/static/js/bundle.js"></script>
      document.head.appendChild(script);

      // script.onload = () => {
      //   console.log("script.onload: ", window.cv);
      // }

      // node.parentNode.insertBefore(script, node);
    } else if (resolve) {
      console.log('resolve 2: ',)
      resolve();
    }
  });

  export default InjectScript;