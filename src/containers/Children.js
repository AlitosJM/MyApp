import React from "react";
import { Link, NavLink,Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Children = props => {
    // const { classWrapper0, classWrapper1, idWrapper, idFooter } = props;
    // const history = useHistory();
    // const classWrapper0 = props.classWrapper0;
    // const classWrapper1 = props.className1;
    // const idWrapper = props.idWrapper;
    // const idFooter = props.idFooter;
    const dispatch = useDispatch();
    // const status0 = useSelector(state => state.status0);
    document.body.className='';

    const  myStyle = { fontWeight: "bold", color: "red"};

    // const onClicked = () => {
    //     dispatch({type:"status0", status:-1}); 
    //     console.log("push");
    //     history.push("/myPage");
    // }

    return (
        <React.Fragment>
            <div className={"wrapper"}>
                <header id={"main-navigation"}> 
                    <div className={"top title"}>
                        <Link
                            to={() => {
                                dispatch({type:"status0", status:-1});
                                return { pathname: "/myPage"}}} 
                        >
                            <h1>JMAT's Blog ☕</h1>
                        </Link>
                        {/* <a onClick={onClicked}>
                            <h1>JMAT's Blog ☕</h1>  
                        </a>   */}
                        
                        {/* <a href="/myPage">
                            <h1>JMAT's Blog ☕</h1>  
                        </a>  */}
                                     
                    </div>
                </header>
                <section id="summary">
                    <h2>Test</h2>
                </section>
                <main>
                    <p> This is a test</p>
                    <p> This is a test</p>
                </main>


                {props.children}       
            </div>
            <section>
                <footer id={"Myfooter"}>
                    <p> JMAT </p>
                </footer>
            </section>
        </React.Fragment>
    );
};

export default Children;