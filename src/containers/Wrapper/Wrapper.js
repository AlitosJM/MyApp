import React from "react";
import { Link, NavLink,Redirect, useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

const Wrapper = props => {
    // const { classWrapper0, classWrapper1, idWrapper, idFooter } = props;
    const history = useHistory();
    // const location = useLocation();
    // const classWrapper0 = props.classWrapper0;
    // const classWrapper1 = props.className1;
    // const idWrapper = props.idWrapper;
    // const idFooter = props.idFooter;
    const dispatch = useDispatch();
    const postId = useSelector(state => state.status0);
    const [token, setToken, deleteToken] = useCookies(['mr-token']);
    document.body.className='';

    //console.log(history.location.pathname, location.pathname)

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
                                    {token['mr-token']? 
                                    <NavLink to={ "/"} onClick={()=>deleteToken(['mr-token'])}>LOGOUT</NavLink>:
                                    history.location.pathname!=='/user'? <NavLink to="/user">LOGIN</NavLink>:null
                                    }
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