export class API{

    static sendFile(body){
      const authHeader = new Headers({"Authorization": `Bearer MY-CUSTOM-AUTH-TOKEN`});
      // const config = {headers: { 'content-type': 'multipart/form-data' }}
      console.log("sendFile")
      // console.log(body.name)

        return fetch(
            `http://127.0.0.1:8000/file/upload/`, {
              method:'POST',
              headers: authHeader,
              body: body
            }
            )
            .then( resp => resp.json() )
            .then( data => {
              alert( JSON.stringify(data, null, "\t") ); 
              return JSON.stringify(data, null, "\t");
            })
    }
}