export class API{

    static sendFile(body){
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
            })
            .then( () => {
              alert( JSON.stringify(datitos, null, "\t") ); 
              return JSON.stringify(datitos, null, "\t");
           });

    }
}

/* .then( data => {
    alert( JSON.stringify(data, null, "\t") ); 
    return JSON.stringify(data, null, "\t");
 })*/

 /*
             .then( async resp => {

              const data = await resp.json()  
              
              const status = resp.statusText;
              console.log(status);                         

              alert( JSON.stringify(data, null, "\t") ); 
              return JSON.stringify(data, null, "\t");}

            )
 */