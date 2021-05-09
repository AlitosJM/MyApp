import React, { Component } from 'react';
import { API } from '../API';

class MyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {file: null, remark: '' , showInput: false,}
  }

  handleFileChange = (e) => {
    const file = e.target.files[0];
    const remark = e.target.files[0].name.replace(/^.*[\\\/]/, '').split(".")[1] + " file";
    console.log(e.target.name, remark, e.target.files[0]);
    const showInput = false;

    !this.state.showInput?
    (
    // this.setState({[e.target.name]: e.target.files[0], remark: remark});
    this.setState({ file, remark, showInput })
    )
    :(null);
    
    
  }

  handleSubmit = async e => {
  if (!this.state.showInput){
  e.preventDefault();

  const formData = new FormData();
  // formData.append("remark", "csv file");
  for (const name in this.state) {
    console.log(name);
    name !== "showInput"? formData.append(name, this.state[name]): null;
  }

  /*console.log('formData')
  console.log(formData['file'])*/

  let msg = await API.sendFile(formData, (showInput) => this.setState({ showInput }));
  console.log(msg)
  console.log(this.state["showInput"])

  /*await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });*/
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
                <input type="file" name="file" placeholder= "archivo" required="required" onChange={fileChange}/>
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
