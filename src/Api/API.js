// https://stackoverflow.com/questions/38235715/fetch-reject-promise-and-catch-the-error-if-status-is-not-ok
// https://www.30secondsofcode.org/articles/s/javascript-await-timeout
// https://jasonwatmore.com/post/2021/10/09/fetch-error-handling-for-failed-http-responses-and-network-errors
// https://stackoverflow.com/questions/37121301/how-to-check-if-the-response-of-a-fetch-is-a-json-object-in-javascript
// https://developer.mozilla.org/es/docs/Web/API/Response
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
    const timeout = new Timeout();
    // .catch(e => {console.log(e.name, e.message); return e})
    const promise = timeout
    .wrap(
      fetch(`http://127.0.0.1:8000/auth/`, {
      method: 'POST',
      headers: myHeader,
      body: JSON.stringify({username, password})}
      ), 15000, {reason: 'Fetch Timeout'}     
    )
    .then(
      async resp => {
        const isJson = resp.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await resp.json() : null;
        
        if (resp.ok){
          if (resp.status===200) return data;
        }
        else {
          // throw resp;
          // data.non_field_errors array(1) data.non_field_errors[0]
          // console.log(data);
          const error = (data && (data.non_field_errors || data.username || data.password)) || resp.status;
          // console.log("Err", error);
          throw new Error(["Logging User", `${error}`].join(" "));
        }
      }      
    )
    // .catch( error => { console.log("Inside ",error); return error})
    .finally(() => {
      timeout.clear(...timeout.ids);
      console.log("finally 1");
    });

    return promise;
  }

  static registerUser(body) {
    const {enteredName: username, enteredPassword: password} = body;
    const myHeader = new Headers({'Content-Type': 'application/json'});
    const timeout = new Timeout();
    console.log("registerUser: ",body);

    const promise = timeout
      .wrap(
        fetch(`http://127.0.0.1:8000/api/users/`, {
        method: 'POST',
        headers: myHeader,
        body: JSON.stringify({username, password})}
        ), 20000, {reason: 'Fetch Timeout'}     
      )
      .then(
        async resp => {
          const isJson = resp.headers.get('content-type')?.includes('application/json');
          const data = isJson ? await resp.json() : null;
          if (resp.ok){
            if (resp.status===201) return data;
          }
          else {
            // data.username array(1) data.username[0]
            const error = (data && (data.username || data.password)) || resp.status;
            // console.log("Err", error);
            throw new Error('Error ' + ["Creating New User", `${error}`].join(" "));
          }
        }        
      )
      // .catch( error => {
      //   const isObj = typeof error !== 'undefined' && "reason" in error;
      //   !isObj? console.error("registerUser error "+ error.name + ': ' + error.message)  :
      //   console.log(`registerUser Failed with reason: ${error.reason}`);  
      //   return error;
      // })
      .finally(() => {
        timeout.clear(...timeout.ids);
        console.log("finally 1");
      });

    return promise;
  }

  static sendFile(body, Myfunction, token) {
    // http://127.0.0.1:8000/file/upload/`
    // const authHeader = new Headers({"Authorization": `Bearer MY-CUSTOM-AUTH-TOKEN`});
    const authHeader = new Headers({'Authorization': `Token ${token}`});
    const timeout = new Timeout();
    const promise = timeout
      .wrap(
        fetch(
        `http://127.0.0.1:8000/api/upload/`, {
          method:'POST',
          headers: authHeader,
          body: body
        })
        , 20000, {
        reason: 'Fetch Timeout',
      })
      .then(
        async resp => {
          const isJson = resp.headers.get('content-type')?.includes('application/json');
          const data = isJson ? await resp.json() : null;
          if (resp.ok)
            {
            console.log("data ok");      
            console.log(data);    
            // resp.status===201? Myfunction(true):Myfunction(false);
            if (resp.status===201){
              Myfunction(true);
              return data;
            }
            else{
              Myfunction(false);
            }
            
          }
          else{
            console.log("data no ok"); 
            const errorOne = (data && (data.detail || data.error)) || resp.status;
            const errorTwo = (data && (data.detail || data.serializer_error)) || resp.status;
            console.log("Err", errorOne, errorTwo);
            throw new Error(["Sending File", `${errorOne}`].join(" "));
            // throw new Error("sending data "+[datitos.statusText, datitos.status].join(" "));
          }
        }  
      )
      .catch( (error) => {  
        console.log("inner catch", error);     
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
    return promise;

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
          ), 30000, {
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