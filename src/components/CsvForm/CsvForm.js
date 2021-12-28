import React, { Component } from 'react';
import { Api } from '../../Api/Api';
import ErrorModal from '../ErrorModal/ErrorModal';
// import { userAPI } from '../../DummyFetch';
import { trackPromise } from 'react-promise-tracker';
import { connect } from 'react-redux';

// export const areas = {
//   spinner1: 'spinner1-area',
//   spinner2: 'spinner2-area',
// };

const MegaBytes = bytes => bytes*(1024**2);

const myDebounceValidation = (fnt, delay) => {
  let timer;
  const internalDebounce = (x_new) => 
    new Promise( (resolve, reject ) => { 
      timer = setTimeout( 
        () => 
        { 
          resolve(fnt(x_new));
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
  // const validNum = (num.length<3 || num.length>9) ? false : true;
  const validNum = (num.length===0 || num.length>9) ? false : true;
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
    this.token = this.props.token || null;
    this.result = "";
  }

  // debounceLog = debounce( this.inputValidation ,500 );
  // myDebounceLog = myDebounce( text => console.log(text) ,500 );

  debounceValidation = myDebounce( inputValidation, 500 );

  inputDebounceValidation = async(x_new) => {
    const validationFnt = await myDebounceValidation( inputValidation, 125 );  

    const res = await validationFnt(x_new);
    if(!res){
      const ModalErr = {title: 'Entrada inválida', message: 'Ingrese un entero'};
      console.log(res, "validation error");
      this.setState(
        (state) => ({ file:state.file, remark:state.remark, showInput:true, x_new:"", error: ModalErr })
      )
    }
    else{
      console.log(res, "validation ok");
      this.setState(
        (state) => ({ file:state.file, remark:state.remark, showInput:state.showInput, x_new:x_new, error: null })
      )}
    
  }
  

  async sendFile(formData, token){
    await Api.sendFile(formData, (showInput) => this.setState({showInput}), token)
    .then( (data) => {
      console.log("sendFile then",data);

      this.props.setObj({...data}); 
      // dataFromBackEnd.push(Obj);   
      // alert( JSON.stringify(datitos, null, "\t") )
    })
    .catch( (error) => {
      console.log("sendFile catch",error);
      const ModalErr = {title: 'Archivo inválido', message: error};
      this.setState(
        (state) => ({ file: null, remark: '' , showInput: false, x_new: '', error: ModalErr }));
    })

    // areas.spinner1
  }

  sendData = async (x_new, token) => {
    const data = await Api.sendData(x_new, token)
    .catch( (error) => {
      const ModalErr = {title: 'Dato inválido', message: error};
      this.setState(
        (state) => ({ file: state.file, remark: state.remark , showInput: true, x_new: state.x_new, error: ModalErr }));
    });

    if (typeof data !== 'undefined'){
      try{
        this.result = data.result;
        const imageUrl = await Api.getImg(token, data.data["pk"]);

        this.props.setStatus1(true); 
        this.props.setUrl(imageUrl.image+'');

        const ModalErr = {title: 'Result', message: this.result};
        this.setState(
          (state) => ({ file: state.file, remark: state.remark , showInput: true, x_new: state.x_new, error: ModalErr }));
      
      }
      catch(error){
        const ModalErr = {title: 'Image Error', message: error};
        this.setState(
          (state) => ({ file: state.file, remark: state.remark , showInput: true, x_new: state.x_new, error: ModalErr }));
      }
    }   
    // areas.spinner2
    // return msg
  }

  fileChangeHandler = e => {
    if(!this.state.showInput){
      const ModalErr = {title: 'Archivo inválido', message: 'archivo > 0.5MB'};
      const limitMB = MegaBytes(0.5);
      const file = e.target.files[0];
      const csv = file.name.replace(/^.*[\\\/]/, '').split(".")[1];
      const remark =  csv + " file";
      console.log("remark:" ,remark, "file:",file);
      // const showInput = false;
      if (file.size > limitMB){
        console.log("file size > 0.5MB");
        this.setState(
          (state) => ({ file: null, remark: '' , showInput: false, x_new: '', error: ModalErr }));
          return;
      }

      this.setState(
        (state) => ({ file, remark, showInput:false, x_new:state.x_new, error: state.error }));
    }    
  }

  submitHandler = e => {
    e.preventDefault();

    if (!this.state.showInput){
      const ModalErr = {title: 'Archivo inválido', message: 'Ingrese un archivo *.csv'};
      if (this.state.remark.split(" ")[0] !== "csv"){
        console.log("no csv file");
        this.setState(
          state => ({ file:state.file, remark:state.remark, showInput:false, x_new:state.x_new, error: ModalErr })
        )
        return ;        
      }
      const formData = new FormData();
      for (const name in this.state) {
        (name !== "showInput" && name !== "error")?
        formData.append(name, this.state[name]): null;
      }
      // const formData = new FormData();
      // formData.append("remark", "csv file");
      trackPromise(this.sendFile(formData, this.token));
      console.log("->","fin", this.state["showInput"]);
    }
    else {
      // const isIntegerValid = this.debounceValidation(this.state.x_new);
      if(!this.state.error ){
        console.log("!this.state.error");
        if(this.state.x_new.trim()){
          trackPromise( this.sendData(this.state.x_new, this.token))
        }
        else{
          const ModalErr = {title: 'Entrada inválida', message: 'Ingrese un entero'};
          this.setState(
            (state) => ({ file:state.file, remark:state.remark, showInput:true, x_new:state.x_new, error: ModalErr })
          )
        }

      }
      
      // !this.state.error && this.state.x_new ? trackPromise( this.sendData(this.state.x_new) ) :
      // (
      //   this.setState(
      //     (state) => ({ file:state.file, remark:state.remark, showInput:true, x_new:state.x_new, error: state.error })
      //   )
      // );  
    }
  }

  changeHandler = (e) => {
    const x_new = e.target.value;
    this.props.setStatus1(false);
    this.inputDebounceValidation(x_new);     
    // this.myDebounceLog( x_new );      
  }

  errorHandler = () => {
    const showInput = !this.state.x_new && !this.state.showInput ? false:true;
    console.log("showInput",showInput)
    this.setState(
      (state) => 
        (
          {file: state.file, remark: state.remark, showInput:showInput , x_new:state.x_new, error: null}
        )
      );     
  }

  render() {

    const myStyle = {
      color: "black",
      fontWeight: "bold",      
    };

    const submitHandler = this.submitHandler;
    const fileChangeHandler  = this.fileChangeHandler;
    const changeHandler  = this.changeHandler;

    const {file, remark, showInput, x_new, error} = this.state;

    return (
        <React.Fragment>
          { this.token?
            <>          
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={this.errorHandler} />}
          
            <div className="card">
              <form onSubmit={submitHandler}>
                  <p><span style={myStyle}>{!showInput? "Envía tu archivo CSV" : "Calcular un nuevo valor para X"}</span></p>
                  {!showInput && <input type="file" name="file" placeholder= "file" required  onChange={fileChangeHandler}/>}
                  { showInput && <input type='text' name="x_new" placeholder= "v.i." value={x_new} onChange={changeHandler}/>}
                  <input type="submit" value={!showInput? "Enviar" : "Calcular"} className="btn btn-primary btn-block btn-large"/>
                  
              </form>
            </div>
            </>: 
                <div className="auth">
                  <p >
                    <span>You have to be logged in, to access the full content!</span>
                  </p>
                </div>
          }
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
