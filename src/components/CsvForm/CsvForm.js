import React, { Component } from 'react';
import { API } from '../../Api/Api';
import ErrorModal from '../ErrorModal/ErrorModal';
// import { userAPI } from '../../DummyFetch';
import { trackPromise } from 'react-promise-tracker';
import { connect } from 'react-redux';

export const areas = {
  spinner1: 'spinner1-area',
  spinner2: 'spinner2-area',
};

const myDebounceValidation = (fnt, delay) => {
  let timer;
  const internalDebounce = (x_new) => 
    new Promise( (resolve, reject ) => { 
      timer = setTimeout( 
        () => 
        { 
          resolve(fnt(x_new))
          clearTimeout(timer);
        } , delay);
      }
    );    
  
  return internalDebounce;
};


const myDebounce = (fnt, delay) => {
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

const inputValidation = (num) => {
  const validNum = (num.length<3 || num.length>9) ? false : true;
  console.log("number is...", validNum)
  // num.match(/^\d+\.\d+$/) valid float  
  
  if(validNum){
    //valid integer (positive or negative)
    console.log("number ok...", validNum)
    return num.match(/^-?\d+$/) ? true:false;
  }
    //not valid number
    console.log("number no ok...", validNum)
    return false; 
}

class MyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {file: null, remark: '' , showInput: false, x_new: '', error: null}
  }

  // debounceLog = debounce( this.inputValidation ,500 );
  // myDebounceLog = myDebounce( text => console.log(text) ,500 );

  debounceValidation = myDebounce( inputValidation, 500 );

  inputDebounceValidation = async(x_new) => {
    const valitaionFnt = await myDebounceValidation( inputValidation, 500 );  

    valitaionFnt(x_new).then( res => {
      if(!res){
        console.log(res, "validation error");}
      else{
        console.log(res, "validation ok")}

    })
  }
  

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
    await API.sendData(x_new)
    .then( (datitos) => {
      console.log("-> 3",datitos);
      // alert( JSON.stringify(datitos, null, "\t") );
      const url = datitos['url'].toString();
      console.log("-> 4",url);
      this.props.setStatus1(true); 
      this.props.setUrl(url);    
    })
    areas.spinner2
    // return msg
  }

  fileChangeHandler = e => {
    if(!this.state.showInput){
      const file = e.target.files[0];
      const csv = file.name.replace(/^.*[\\\/]/, '').split(".")[1];
      const remark =  csv + " file";
      console.log("remark:" ,remark, "file:",file);
      // const showInput = false;

      this.setState(
        (state) => ({ file, remark, showInput:false, x_new:state.x_new, error: state.error }));
    }    
  }

  submitHandler = e => {
    e.preventDefault();

    if (!this.state.showInput){
      const ModalErr = {title: 'Archivo inválida', message: 'Ingrese un archivo *.csv'};
      if (this.state.remark.split(" ")[0] !== "csv"){
        console.log("no csv file");
        this.setState(
          state => ({ file:state.file, remark:state.remark, showInput:false, x_new:state.x_new, error: ModalErr })
        )
        return ;        
      }
      const formData = new FormData();
      // formData.append("remark", "csv file");
      for (const name in this.state) {
        // console.log(name);
        name !== "showInput"? formData.append(name, this.state[name]): null;
      }
      
      trackPromise(this.sendFile(formData));
      console.log("->","fin", this.state["showInput"]);
    }
    else {
      const isIntegerValid = this.debounceValidation(this.state.x_new);
      const ModalErr = {title: 'Entrada inválida', message: 'Ingrese un entero'};
      isIntegerValid ? trackPromise( this.sendData(this.state.x_new) ):
      (
        this.setState(
          (state) => ({ file:state.file, remark:state.remark, showInput:true, x_new:state.x_new, error: ModalErr })
          )
      );  
    }
  }

  changeHandler = (e) => {
    const x_new = e.target.value;
    this.props.setStatus1(false);
    this.inputDebounceValidation(x_new);
    this.setState(
      (state, e) => 
        (
          {file: state.file, remark: state.remark, showInput:state.showInput , x_new, error: state.error}
        )
      );      
      // this.myDebounceLog( x_new );      
  }

  errorHandler = () => {
    this.setState(
      (state) => 
        (
          {file: state.file, remark: state.remark, showInput:state.showInput , x_new:state.x_new, error: null}
        )
      );     
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

    const {file, remark, showInput, x_new, error} = this.state;

    return (
        <React.Fragment>
          {error && <ErrorModal title={error.title} message={error.message} onConfirm={this.errorHandler} />}
          
          <div className="card">
            <form onSubmit={submitHandler}>
                <p><span style={myStyle}>{!showInput? "CSV" : "Calcular"}</span>
                {!showInput && <input type="file" name="file" placeholder= "file" required="required" onChange={fileChangeHandler}/>}
                { showInput && <input type='text' name="x_new" placeholder= "v.i." disabled = {false}  onChange={changeHandler}/>}
                <input type="submit" value={!showInput? "Enviar" : "Calcular"} className="btn btn-primary btn-block btn-large"/>
                </p>
            </form>
          </div>
        </React.Fragment>
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
