import React from "react";
import { Link, NavLink,Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Wrapper = props => {
    // const { classWrapper0, classWrapper1, idWrapper, idFooter } = props;
    // const history = useHistory();
    // const classWrapper0 = props.classWrapper0;
    // const classWrapper1 = props.className1;
    // const idWrapper = props.idWrapper;
    // const idFooter = props.idFooter;
    const dispatch = useDispatch();
    const postId = useSelector(state => state.status0);
    document.body.className='';

    // const  myStyle = { fontWeight: "bold", color: "red"};

    /* const onClicked = () => {
        dispatch({type:"status0", status:-1}); 
        console.log("push");
        history.push("/myPage");
    } */

    return (
        <React.Fragment>
            <div className={"wrapper"}>
                <header id={"main-navigation"}> 
                    <div className={"top title"}>
                        <h1>
                            <Link
                                style={{ textDecoration: 'none' }}
                                to={() => {
                                    dispatch({type:"status0", status:-1});
                                    return { pathname: "/intro"}}} 
                            >
                                JMAT's Blog ☕                            
                            </Link>
                        </h1>
                        
                        <nav>
                            <ul>
                                <li>
                                    <NavLink to="/allPost">ALLPOST</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/user">LOGIN</NavLink>
                                </li>
                            </ul>
                        </nav>

                        {/* <a onClick={onClicked}>
                            <h1>JMAT's Blog ☕</h1>  
                        </a> */}
                        
                        {/* <a href="/myPage">
                            <h1>JMAT's Blog ☕</h1>  
                        </a>  */}
                                     
                    </div>
                </header>

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

export default Wrapper;