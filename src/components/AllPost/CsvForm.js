import React, { Component } from 'react';


class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
  }
  myChangeHandler = (event) => {
    this.setState({username: event.target.value});
  }


  render() {

    const mystyle = {
      color: "black",
      fontWeight: "bold",
      textDecoration: "underline"
    };

    return (
      <form>
        <h1>Hello {this.state.username}</h1>
        <p><span style={mystyle}>CSV</span>Enter your name:</p>

      <input
        type='text'
        onChange={this.myChangeHandler}
      />
      </form>
    );
  }
}

export default MyForm;
