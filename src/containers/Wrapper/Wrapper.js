import React from "react";
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';

const Wrapper = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const postId = useSelector(state => state.status0);
    const [token, setToken, deleteToken] = useCookies(['mr-token']);
    document.body.className='';

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
                                    <NavLink to={ "/"} onClick={()=>{deleteToken(['mr-token']);}}>LOGOUT</NavLink>:
                                    history.location.pathname!=='/user'? <NavLink to="/user">LOGIN</NavLink>:null
                                    }
                                </li>
                            </ul>
                        </nav>
                                     
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