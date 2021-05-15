import React, { Component } from 'react';
import { API } from '../../API';
import { userAPI } from '../../DummyFetch';
import { trackPromise } from 'react-promise-tracker';

class MyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {file: null, remark: '' , showInput: false, x_new: 0}
  }

  handleFileChange = (e) => {
    if(!this.state.showInput){
      const file = e.target.files[0];
      const remark = e.target.files[0].name.replace(/^.*[\\\/]/, '').split(".")[1] + " file";
      console.log(e.target.name, remark, e.target.files[0]);
      const showInput = false;

    // this.setState({[e.target.name]: e.target.files[0], remark: remark});
      this.setState({ file, remark, showInput })}    
    else {
      const x_new = e.target.value;
      console.log(e.target.name, x_new);
      this.setState({ x_new })
      
    }
    
  }

  handleSubmit = e => {
    e.preventDefault();
    
    if (!this.state.showInput){

      const formData = new FormData();
      // formData.append("remark", "csv file");
      for (const name in this.state) {
        // console.log(name);
        name !== "showInput"? formData.append(name, this.state[name]): null;
      }

      /*console.log('formData')
      console.log(formData['file'])*/
      
      
      // const msg = await API.sendFile(formData, (showInput) => this.setState({ showInput }));
      
      trackPromise(
        API.sendFile2(formData)
        .then( (datitos) => {
          console.log("2",datitos);
          //alert( JSON.stringify(datitos2, null, "\t") );
        
        }));
        // trackPromise(
        //   userAPI.fetchFiles(formData, (showInput) => this.setState({ showInput }))
        //   .then( (datitos) => {console.log( JSON.stringify(datitos, null, "\t") ); }
  
        //   )
      

      // console.log(msg)
      console.log("->",this.state["showInput"])
  }
  else {
    const msg = API.sendData(this.state.x_new);
    console.log(msg)

  }
}

  myChangeHandler = (e) => {
    this.setState({name: e.target.value});
  }


  render() {

    const mystyle = {
      color: "black",
      fontWeight: "bold",
      textDecoration: "underline"
    };

    const submit = this.handleSubmit;
    const fileChange  = this.handleFileChange;

    const {file, remark, showInput} = this.state;

    return (

        // <h1>Hello {this.state.name}</h1>
        <div className="content">
          <div className="card">
            <form onSubmit={submit}>
                <p><span style={mystyle}>CSV</span>
                {/*<input type='text' />*/}
                <input type={!this.state.showInput? "file" : "text"} name={!this.state.showInput? "file" : "text"} placeholder= {!this.state.showInput? "archivo" : "x_new"} required="required" onChange={fileChange}/>
                {showInput && <input type='text' name="x_new" placeholder= " type here " disabled = {true}/>}
                <input type="submit" value={!this.state.showInput? "Enviar" : "Calcular"} className="btn btn-primary btn-block btn-large"/>
                
                </p>
            </form>
          </div>
        </div>

    );
  }
}

export default MyForm;
