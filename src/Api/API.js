// https://stackoverflow.com/questions/38235715/fetch-reject-promise-and-catch-the-error-if-status-is-not-ok
// https://www.30secondsofcode.org/articles/s/javascript-await-timeout
class Timeout {
  constructor() {
    this.ids = [];
  }

  set = (delay, reason) =>
    new Promise((resolve, reject) => {
      const id = setTimeout(() => {
        if (reason === undefined) resolve();
        else reject(reason);
        this.clear(id);
      }, delay);
      this.ids.push(id);
    });

  wrap = (promise, delay, reason) =>
    Promise.race([promise, this.set(delay, reason)]);

  clear = (...ids) => {
    this.ids = this.ids.filter(id => {
      if (ids.includes(id)) {
        clearTimeout(id);
        return false;
      }
      return true;
    });
  };
}


export class Api{

  static loginUser(body) {
    const {enteredName: username, enteredPassword: password} = body;
    const myHeader = new Headers({'Content-Type': 'application/json'});
    return fetch(`http://127.0.0.1:8000/auth/`, {
      method: 'POST',
      headers: myHeader,
      body: JSON.stringify({username, password})
    }).then( resp => resp.json())
  }

  static registerUser(body) {
    const {enteredName: username, enteredPassword: password} = body;
    const myHeader = new Headers({'Content-Type': 'application/json'});
    console.log("registerUser: ",body);
    return fetch(`http://127.0.0.1:8000/api/users/`, {
      method: 'POST',
      headers: myHeader,
      body: JSON.stringify({username, password})
    }).then( resp => resp.json())
  }

  static sendFile(body, Myfunction, token) {
    // http://127.0.0.1:8000/file/upload/`
    //const authHeader = new Headers({"Authorization": `Bearer MY-CUSTOM-AUTH-TOKEN`});
    const authHeader = new Headers({'Authorization': `Token ${token}`});
    const timeout = new Timeout();
    const promesa = timeout
      .wrap(
        fetch(
        `http://127.0.0.1:8000/api/upload/`, {
          method:'POST',
          headers: authHeader,
          body: body
        })
        , 3000, {
        reason: 'Fetch timeout',
      })
      .then(
        resp => {
        const datitos = resp;
        if (datitos.ok)
          {
          console.log("datitos ok");      
          console.log("0", datitos);    
          resp.status===201? Myfunction(true) : Myfunction(false);
          return datitos.json();  
        }
        else{
          console.log("datitos no ok"); 
          throw new Error("sending data "+[datitos.statusText, datitos.status].join(" "));
          }
        }  
      )
      .catch( (error) => {  
        console.log("inner catch", error.reason);     
        const isObj = typeof error !== 'undefined' && "reason" in error;
        console.log("obj", isObj);
        !isObj? console.log(`${error}`):
                console.log(`Failed with reason: ${error.reason}`)
      })
      .finally(() => {
        timeout.clear(...timeout.ids);
        console.log("finally 1");
      });

    console.log("fin"); 
    return promesa;

  }

  static sendData(x_new, token){
    // 'Authorization': `Token ${token}`
    // `http://127.0.0.1:8000/api/users/${userId}/change_pass/`

    //  "Authorization": `Bearer MY-CUSTOM-AUTH-TOKEN` sin token
    // `http://127.0.0.1:8000/file/lr/` sin token
    //const authHeader = new Headers({'Content-Type':'application/json', "Authorization": `Bearer MY-CUSTOM-AUTH-TOKEN`});
    const authHeader = new Headers({'Content-Type':'application/json', 'Authorization': `Token ${token}`});
    console.log("sendData: ", x_new);
    const timeout = new Timeout();

    const promesa = timeout.wrap(
      fetch(
        `http://127.0.0.1:8000/api/lr/`, {
          method:'POST',
          headers: authHeader,
          body: JSON.stringify({x: x_new})}
          ), 3000, {
            reason: 'Fetch timeout',
        })
        .then( resp => {
          const datitos = resp;

          if (datitos.ok){
            console.log("-> 1", datitos);
            return datitos.json();}
          else{
            console.log("-> 1.3", datitos);
            console.log("datitos no ok"); 
            throw new Error("sending data "+[datitos.statusText, datitos.status].join(" "));}
        })
        .then( (datitos) => {
          console.log("-> 1.5",datitos)
          const url = ["http://127.0.0.1:8000", datitos.data['image']];
          datitos.url= url.join("")

          console.log("-> 2",datitos)
          // alert( JSON.stringify(datitos, null, "\t") ); 
          // alert(datitos); 
          return datitos })
        .catch(error => {
          const isObj = typeof error !== 'undefined' && "reason" in error;
          console.log("obj", isObj);
          !isObj? console.log(`${error}`):
                  console.log(`Failed with reason: ${error.reason}`)
        })
        .finally(() => timeout.clear(...timeout.ids));
    
    return promesa; 
  }  

}