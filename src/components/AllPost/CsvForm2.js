import React, { useState, useRef } from "react";
import { API } from '../API';

const DataForm = () => {

    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const submitForm = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("file", selectedFile);

        let msg = await API.sendFile(formData);
        console.log(msg)
    };

    return (
      <div className="content card">
        <form>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
  
          <FileUploaded
            onFileSelectSuccess={(file) => setSelectedFile(file)}
            onFileSelectError={({ error }) => alert(error)}
          />

          <button onClick={submitForm}>Submit</button>

        </form>
      </div>
    );
  };


export const FileUploaded = ({onFileSelectSuccess, onFileSelectError}) => {
    const fileInput = useRef(null)

    const MegaBytes = bytes => bytes*(1024**2);

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
        if (file.size > MegaBytes(1)) // bytes ?
        {   console.log("Mayor a 1MB")        
            onFileSelectError({ error: "File size cannot exceed more than 1MB" });}
        else {
            console.log("No mayor a 1MB")
            onFileSelectSuccess(file);}
    }

    return ( 
        <div>
             <input type="file" onChange={handleFileInput}></input>
             {/* <button onClick={e => fileInput.current && fileInput.current.click()} className="btn btn-primary btn-block"></button> */}
        </div>

    );
}

export default DataForm;