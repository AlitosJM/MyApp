import React, { Component } from 'react';


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
  for (let name in this.state) {
    console.log(name)
    console.log(this.state[name])
    formData.append(name, this.state[name]);
  }

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


    return (
      <div>

        {/*<h1>Hello {this.state.name}</h1>*/}
        <form onSubmit={this.handleSubmit}>
            <p><span style={mystyle}>CSV</span>
            {/*<input type='text' />*/}
            <input type="file" name="file" required="required" onChange={this.handleFileChange}/>
            <input type="submit" value="Guardar" className="btn btn-primary btn-block btn-large"/>
            </p>

        </form>
      </div>
    );
  }
}

export default MyForm;
