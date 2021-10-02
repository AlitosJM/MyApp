import React, { Component } from 'react';
import { API } from '../../Api/Api';
// import { userAPI } from '../../DummyFetch';
import { trackPromise } from 'react-promise-tracker';
import { connect } from 'react-redux';

export const areas = {
  spinner1: 'spinner1-area',
  spinner2: 'spinner2-area',
};


const myDebouncex = (fnt, delay) => {
  let timer;
  const internalDebounce = (x_new) => {
    clearTimeout(timer);
    timer = setTimeout( () => { fnt(x_new)}, delay);
  }
  return internalDebounce;
};


const debounce = (fnt, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout( () => { fnt(...args)}, delay);
  };

};

class MyForm extends Component {
  constructor(props) {
    super(props);

    this.state = {file: null, remark: '' , showInput: false, x_new: 0}
  }

  debounceLog = debounce( text => console.log(text) ,500 );
  debounceLogx = myDebouncex( text => console.log(text) ,500 );
  

  async sendFile(formData){
    await API.sendFile(formData, (showInput) => this.setState({showInput}))
    .then( (datitos) => {
      console.log("2",datitos);

      this.props.setObj({...datitos});
 
      // dataFromBackEnd.push(Obj);   
      alert( JSON.stringify(datitos, null, "\t") )
    })

    areas.spinner1
  }

  sendData = async (x_new) => {
    // const {fnt0, fnt1} = this.props;
    // const msg = await API.sendData2(x_new)
    await API.sendData(x_new)
    .then( (datitos) => {
      console.log("-> 3",datitos);
      // alert( JSON.stringify(datitos, null, "\t") );
      // const url = datitos.data['image'].toString();
      const url = datitos['url'].toString();
      console.log("-> 4",url);
      // fnt0(true);
      this.props.setStatus1(true); 
      // fnt1(url);
      this.props.setUrl(url);
    
    })
    areas.spinner2
    // return msg
  }

  fileChangeHandler = e => {
    if(!this.state.showInput){
      const file = e.target.files[0];
      const remark = file.name.replace(/^.*[\\\/]/, '').split(".")[1] + " file";
      console.log(e.target.name, remark, file);
      // const showInput = false;

      this.setState(
        (state) => ({ file, remark, showInput:false, x_new:state.x_new }));
    }    
  }

  submitHandler = e => {
    e.preventDefault();
    
    if (!this.state.showInput){

      const formData = new FormData();
      // formData.append("remark", "csv file");
      for (const name in this.state) {
        // console.log(name);
        name !== "showInput"? formData.append(name, this.state[name]): null;
      }
      
      trackPromise(
        this.sendFile(formData)
        );
      console.log("->","fin", this.state["showInput"]);
  }
  else {
    trackPromise(
      this.sendData(this.state.x_new));
  }
}

  changeHandler = (e) => {
    const x_new = e.target.value;
    // console.log(x_new);
    this.props.setStatus1(false);
    this.setState(
      (state, e) => 
        (
          {file: state.file, remark: state.remark, showInput:state.showInput , x_new}
        )
      );
      // this.debounceLog(x_new);
      this.debounceLogx( x_new );
      
  }

  render() {

    const myStyle = {
      color: "black",
      fontWeight: "bold",
      textDecoration: "underline"
    };

    const submitHandler = this.submitHandler;
    const fileChangeHandler  = this.fileChangeHandler;
    const changeHandler  = this.changeHandler;

    const {file, remark, showInput, x_new} = this.state;

    return (

          <div className="card">
            <form onSubmit={submitHandler}>
                <p><span style={myStyle}>CSV</span>
                {!showInput && <input type="file" name="file" placeholder= "file" required="required" onChange={fileChangeHandler}/>}
                { showInput && <input type='text' name="x_new" placeholder= "v.i." disabled = {false}  onChange={changeHandler}/>}
                <input type="submit" value={!showInput? "Enviar" : "Calcular"} className="btn btn-primary btn-block btn-large"/>
                </p>
            </form>
          </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status0: state.status0,
    status1: state.status1,
    obj0: state.obj0
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setStatus1: (status) => dispatch({type:"status1", status:status}),
    setUrl: (url) => dispatch({type:"setUrl", url:url}),
    setObj : (obj) => dispatch({type:"setObj0", obj}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps) (MyForm);
