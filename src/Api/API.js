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
    const promise = timeout
    .wrap(
      fetch(`https://my-api-ml.herokuapp.com/auth/`, {
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

          const error = (data && (data.non_field_errors || data.username || data.password)) || resp.status;
          throw new Error(["Logging User", `${error}`].join(" "));
        }
      }      
    )
    .finally(() => {
      timeout.clear(...timeout.ids);
    });

    return promise;
  }

  static registerUser(body) {
    const {enteredName: username, enteredPassword: password, enteredEmail: email} = body;
    const myHeader = new Headers({'Content-Type': 'application/json'});
    const timeout = new Timeout();

    const promise = timeout
      .wrap(
        fetch(`https://my-api-ml.herokuapp.com/api/users/`, {
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
            const error = (data && (data.username || data.password)) || resp.status;
            throw new Error('Error ' + ["Creating New User", `${error}`].join(" "));
          }
        }        
      )
      .finally(() => {
        timeout.clear(...timeout.ids);
      });

    return promise;
  }

  static sendFile(body, Myfunction, token) {
    const authHeader = new Headers({'Authorization': `Token ${token}`});
    const timeout = new Timeout();
    const promise = timeout
      .wrap(
        fetch(
        `https://my-api-ml.herokuapp.com/api/upload/`, {
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
            if(typeof errorTwo === 'object' && errorTwo !== null && !Array.isArray(errorTwo)){           
              if("file" in errorTwo) error.push(errorTwo.file+'');
              if("remark" in errorTwo) error.push(errorTwo.remark.toString());              
            }
            throw new Error(error.join(" "));
          }
        }  
      )
      .catch( (error) => {
        const isError = typeof error !== 'undefined' && "reason" in error;
        const displayError = !isError? String(error.message):`Failed With Reason: ${error.reason}`
        throw displayError;
      })
      .finally(() => {
        timeout.clear(...timeout.ids);
      });
    return promise;
  }

  static sendData(x_new, token){
    const authHeader = new Headers({'Content-Type':'application/json', 'Authorization': `Token ${token}`});
    
    const timeout = new Timeout();

    const promesa = timeout.wrap(
      fetch(
        `https://my-api-ml.herokuapp.com/api/lr/`, {
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
            return data;}
          else{
            let error = ["Sending x:"];
            const errorOne = (data && (data.detail || data.error)) || resp.status;
            const errorTwo = (data && data.serializer_error) || resp.status;
            error.push(`${errorOne}`);
            error.push(errorTwo+'');

            throw new Error(error.join(" "));
          }
        })
        .catch(error => {
          const isError = typeof error !== 'undefined' && "reason" in error;
          const displayError = !isError? error.message.toString():
          "Failed With Reason: " + error.reason+'';
          throw displayError;
        })
        .finally(() => timeout.clear(...timeout.ids));
    
    return promesa; 
  }

  static getImg(token, id, url="https://my-api-ml.herokuapp.com/api/ml/images"){
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
          throw new Error(error.join(" "));
        }        
      })
      .catch(error => {
        const isError = typeof error !== 'undefined' && "reason" in error;
        const displayError = !isError? error.message.toString():
        "Failed With Reason: " + error.reason+'';
        throw displayError;
      })
      .finally(() => timeout.clear(...timeout.ids));

    return promesa;
  }
}