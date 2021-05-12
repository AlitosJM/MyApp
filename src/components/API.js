export class API{

    static sendFile(body, Myfunction){
      const authHeader = new Headers({"Authorization": `Bearer MY-CUSTOM-AUTH-TOKEN`});
      // const config = {headers: { 'content-type': 'multipart/form-data' }}
      let datitos = {};
      console.log("sendFile")
      // console.log(body.name)

        return fetch(
            `http://127.0.0.1:8000/file/upload/`, {
              method:'POST',
              headers: authHeader,
              body: body
            }
            )
            .then( async resp => {

              datitos = await resp.json()  
              
              const status = resp.statusText;
              datitos.status = status;
            
              status==="Created"? Myfunction(true) : Myfunction(false);
            })
            .then( () => {
              alert( JSON.stringify(datitos, null, "\t") ); 
              return JSON.stringify(datitos, null, "\t");
           });

    }

    static sendData(x_new){
      const authHeader = new Headers({'Content-Type':'application/json', "Authorization": `Bearer MY-CUSTOM-AUTH-TOKEN`});
      // const config = {headers: { 'content-type': 'multipart/form-data' }}
      let datitos = {};
      console.log("sendData")
        return fetch(
            `http://127.0.0.1:8000/file/lr/`, {
              method:'POST',
              headers: authHeader,
              body: JSON.stringify({x: x_new})
            }
            )
            .then( async resp => {

              datitos = await resp.json()  
              
              const status = resp.statusText;
              datitos.status = status;
              alert(status)
            
              // status==="Ok"? Myfunction(true) : Myfunction(false);
            })
            .then( () => {
              alert( JSON.stringify(datitos, null, "\t") ); 
              return JSON.stringify(datitos, null, "\t");
           });

    }

    static sendFile2(body, Myfunction) {
      const authHeader = new Headers({"Authorization": `Bearer MY-CUSTOM-AUTH-TOKEN`});
      let datitos = {};

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(
            fetch(
            `http://127.0.0.1:8000/file/upload/`, {
              method:'POST',
              headers: authHeader,
              body: body
            }
          )
            .then(
              async resp => {
                datitos = await resp.json();     
                console.log(datitos)             
                const status = resp.statusText;
                datitos.status = status;              
                status==="Created"? Myfunction(true) : Myfunction(false);
              }));
        }, 3000)
      });
    
      return promise;
    }

}