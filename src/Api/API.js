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
    const {enteredName: username, enteredPassword: password, enteredEmail: email} = body;
    const myHeader = new Headers({'Content-Type': 'application/json'});
    const timeout = new Timeout();
    // .catch(e => {console.log(e.name, e.message); return e})
    const promise = timeout
    .wrap(
      fetch(`http://127.0.0.1:8000/auth/`, {
      method: 'POST',
      headers: myHeader,
      body: JSON.stringify({username, password, email})}
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
    const {enteredName: username, enteredPassword: password, enteredEmail: email} = body;
    const myHeader = new Headers({'Content-Type': 'application/json'});
    const timeout = new Timeout();
    console.log("registerUser: ",body);

    const promise = timeout
      .wrap(
        fetch(`http://127.0.0.1:8000/api/users/`, {
        method: 'POST',
        headers: myHeader,
        body: JSON.stringify({username, password, email})}
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
        , 10000, {
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
            let error = ["Sending File:"];
            const errorOne = (data && (data.detail || data.error)) || resp.status;
            const errorTwo = (data && data.serializer_error) || resp.status;
            error.push(`${errorOne}`);
            // console.log("Err1", error);
            if(typeof errorTwo === 'object' && errorTwo !== null && !Array.isArray(errorTwo)){
              //console.log("Err2", errorTwo.file, errorTwo.remark);              
              if("file" in errorTwo) error.push(errorTwo.file+'');
              if("remark" in errorTwo) error.push(errorTwo.remark.toString());              
            }
            // console.log("Err3", error);
            throw new Error(error.join(" "));
            // throw new Error("sending data "+[datitos.statusText, datitos.status].join(" "));
          }
        }  
      )
      .catch( (error) => {
        // console.log("inner catch1", error);
        // console.log("inner catch2", error.name);
        const isError = typeof error !== 'undefined' && "reason" in error;
        console.log("isError", isError);
        const displayError = !isError? String(error.message):`Failed With Reason: ${error.reason}`
        throw displayError;
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
            reason: 'Fetch Timeout',
        })
        .then( async resp => {
          const isJson = resp.headers.get('content-type')?.includes('application/json');
          const data = isJson ? await resp.json() : null;

          if (resp.ok){
            console.log("-> 1", resp);
            return data;}
          else{
            let error = ["Sending x:"];
            const errorOne = (data && (data.detail || data.error)) || resp.status;
            const errorTwo = (data && data.serializer_error) || resp.status;
            error.push(`${errorOne}`);
            error.push(errorTwo+'');
            console.log("Err0", errorOne);
            console.log("Err1", error);
            throw new Error(error.join(" "));
          }
        })
        // .then( (data) => {
        //   const url = ["http://127.0.0.1:8000", data.data['image']];
        //   data.url= url.join("")

        //   console.log("-> 2",data)
        //   // alert( JSON.stringify(datitos, null, "\t") ); 
        //   // alert(datitos); 
        //   return data })
        .catch(error => {
          const isError = typeof error !== 'undefined' && "reason" in error;
          console.log("isError", isError);
          const displayError = !isError? error.message.toString():
          "Failed With Reason: " + error.reason+'';
          throw displayError;
        })
        .finally(() => timeout.clear(...timeout.ids));
    
    return promesa; 
  }

  static getImg(token, id, url="http://127.0.0.1:8000/api/ml/images"){
    const authHeader = new Headers({'Content-Type':'application/json', 'Authorization': `Token ${token}`});
    const timeout = new Timeout();

    const promesa = timeout.wrap(
      fetch(
        url+`/${id}`, {
          method:'GET',
          headers: authHeader,}
          ), 10000, {
            reason: 'Fetch Timeout',
      })
      .then( async resp => {
        const isJson = resp.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await resp.json() : null;
        if (resp.ok){
          return data;
        }
        else{
          let error = ["Getting Image:"];
          const errorOne = (data && data.detail) || resp.status;
          error.push(String(errorOne));
          // console.log("Err1", error);
          throw new Error(error.join(" "));
        }        
      })
      .catch(error => {
        const isError = typeof error !== 'undefined' && "reason" in error;
        console.log("isError", isError);
        const displayError = !isError? error.message.toString():
        "Failed With Reason: " + error.reason+'';
        throw displayError;
      })
      .finally(() => timeout.clear(...timeout.ids));

    return promesa;
  }

}