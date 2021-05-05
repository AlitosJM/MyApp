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
      <div>
        <h1>Hello {this.state.username}</h1>
        <form>          
            <p><span style={mystyle}>CSV</span>
            <input type="file" name="file" required="required"></input>
            <input type="submit" value="Guardar" class="btn btn-primary btn-block btn-large"></input>
            </p>          
          
        </form> 
      </div>
    );
  }
}

export default MyForm;
