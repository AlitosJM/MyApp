import React, { Component } from 'react';
import { API } from '../API';

class MyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {file: null}
  }

  handleFileChange = (e) => {
    this.setState({[e.target.name]: e.target.files[0],})
  }

  handleSubmit = async e => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("remark", "csv file");
  for (let name in this.state) {
    formData.append(name, this.state[name]);
  }

  /*console.log('formData')
  console.log(formData['file'])*/

  const msg = await API.sendFile(formData);

  console.log(msg)

  /*await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });*/

  alert('done');
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

    return (

        // <h1>Hello {this.state.name}</h1>
        <div className="content">
          <div className="card">
            <form onSubmit={submit}>
                <p><span style={mystyle}>CSV</span>
                {/*<input type='text' />*/}
                <input type="file" name="file" required="required" onChange={fileChange}/>
                <input type="submit" value="Guardar" className="btn btn-primary btn-block btn-large"/>
                </p>

            </form>
          </div>
        </div>

    );
  }
}

export default MyForm;
