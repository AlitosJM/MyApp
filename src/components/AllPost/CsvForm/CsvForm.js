import React, { Component } from 'react';
import { API } from '../../API';
import { userAPI } from '../../DummyFetch';
import { trackPromise } from 'react-promise-tracker';

export const areas = {
  spinner1: 'spinner1-area',
  spinner2: 'spinner2-area',
};

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
      // const x_new = e.target.value;
      // console.log(e.target.name, x_new);
      // this.setState({ x_new })
      
    }
    
  }

  async sendFile(formData){
    await API.sendFile2(formData, (showInput) => this.setState({showInput}))
    .then( (datitos) => {
      console.log("2",datitos);
      alert( JSON.stringify(datitos, null, "\t") );}
      )
      areas.spinner1
  }

  sendData = async (x_new) => {
    const {fnt0, fnt1} = this.props;
    // const msg = await API.sendData2(x_new)
    await API.sendData2(x_new)
    .then( (datitos) => {
      console.log("-> 3",datitos);
      // alert( JSON.stringify(datitos, null, "\t") );
      const url = datitos.data['image'].toString();
      console.log("-> 4",url);
      fnt0(true);
      fnt1(url);
    
    })
    areas.spinner2
    // return msg
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
        this.sendFile(formData)
        /*API.sendFile2(formData, (showInput) => this.setState({ showInput }))
        .then( (datitos) => {
          console.log("2",datitos);
          alert( JSON.stringify(datitos, null, "\t") );
        
        })*/
        );
        // trackPromise(
        //   userAPI.fetchFiles(formData, (showInput) => this.setState({ showInput }))
        //   .then( (datitos) => {console.log( JSON.stringify(datitos, null, "\t") ); }
  
        //   )
      

      // console.log(msg)
      console.log("->","fin", this.state["showInput"]) // this.state["showInput"]
  }
  else {
    trackPromise(
      this.sendData(this.state.x_new));
    // const msg = this.sendData(this.state.x_new);

    // const msg = API.sendData2(this.state.x_new)
    // .then( (datitos) => {
    //   console.log("-> 3",datitos);
    //   alert( JSON.stringify(datitos, null, "\t") );
    
    // });
    // console.log("+",msg)

  }
}

  myChangeHandler = (e) => {
  
    this.props.fnt0(false);
    this.setState({x_new: e.target.value});
  }


  render() {

    const mystyle = {
      color: "black",
      fontWeight: "bold",
      textDecoration: "underline"
    };

    const submit = this.handleSubmit;
    const fileChange  = this.handleFileChange;
    const myChangeHandler  = this.myChangeHandler;

    const {file, remark, showInput, x_new} = this.state;

    return (

        // <h1>Hello {this.state.name}</h1>
        <div className="content">
          <div className="card">
            <form onSubmit={submit}>
                <p><span style={mystyle}>CSV</span>
                {/*<input type='text' />*/}
                {!showInput && <input type="file" name="file" placeholder= "archivo" required="required" onChange={fileChange}/>}
                { showInput && <input type='text' name="x_new" placeholder= "v.i." disabled = {false}  onChange={myChangeHandler}/>}
                <input type="submit" value={!showInput? "Enviar" : "Calcular"} className="btn btn-primary btn-block btn-large"/>
                
                </p>
            </form>
          </div>
        </div>

    );
  }
}

export default MyForm;
