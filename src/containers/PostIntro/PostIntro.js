import React, { useCallback }  from "react";

import post_objects from '../../components/Post/Post';
import Card from '../../components/Card/Card';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect, Link, NavLink } from "react-router-dom";

import JMAT from '../../images/Jmat2.jpg';
import { useCookies } from "react-cookie";

const MappingFunc = React.memo(({renderPost, myClick}) => {  
  return post_objects.map(post => {
    const objPost = {id:post.post_id, image: post.image,title:post.title, subtitle:post.subtitle, body:post.body, func:myClick};
    if (post.post_id<3 && renderPost===0) return <Card key={post.post_id} objPost = {objPost} />

    if(renderPost===1) return <Card key={post.post_id} objPost = {objPost} />  
  }) 
});



const PostIntro = (props) => {
  const dispatch = useDispatch();
  const status0 = useSelector(state => state.status0);
  const history = useHistory();
  document.body.className = "";
  const [token, setToken, deleteToken] = useCookies(['mr-token']);

  const onClicked = (id) => {
    dispatch({type:"status0", status:id}); 
  }

  const mystyle = {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    margin: "1rem 0.5rem auto 1rem"
  };

const introHeader = (        
  <section id="welcome">
    <header>
      <img src={JMAT} alt="JMAT's Blog"/>
      <div className="title">
        <h2>Welcome</h2>  
        <em>
          <p style={mystyle}>"Success is not final; failure is not fatal: It is the courage to continue that counts."</p> 
        </em>              
        <p style={mystyle}>Winston S. Churchill</p>           
      </div>            
    </header>          
</section>);

const introPost = useCallback( () => {  
  const styleSection = props.index_render===0 ? "latest-posts-0":"latest-posts-1";
  return(
  status0===-1? 
  <section id={styleSection} >
    <h2 style={mystyle}>Things I like doing...</h2>
    <div className="sub-wrapper">
      <MappingFunc renderPost={props.index_render} myClick={onClicked}/>
    </div>
  </section>
  :(
    <Redirect to={`/detail/${status0}`}/>      
  )
  );
}, [status0, props.index_render]);

const logoutUser = () => {
  deleteToken(['mr-token']);
}


  return (
    <React.Fragment>
      <div className="wrapper">
        
        <header id="main-navigation"> 
            <div className="top title">
            {props.index_render === 1?
              <h1>
                <Link
                    style={{ textDecoration: 'none' }}
                    to={() => {
                        dispatch({type:"status0", status:-1});
                        return { pathname: "/intro"}}} 
                >
                    JMAT's Blog ☕                            
                </Link>
              </h1>:
               <h1>JMAT's Blog ☕</h1>}
               <nav>
                 <ul>
                    <li>
                      <NavLink to="/allPost">ALLPOST</NavLink>
                    </li>
                    <li>
                      {!token['mr-token'] ? <NavLink to="/user">LOGIN</NavLink>:
                        <NavLink to={"/"} onClick={logoutUser}>LOGOUT</NavLink>}
                    </li>
                </ul>
               </nav>
              
            </div>
        </header>

        {props.index_render === 0? 
        <div> {introHeader}{introPost()} </div>: introPost()}

      </div>
      
      <section>
        <footer id="Myfooter">
          <p> JMAT </p>
        </footer>
      </section>

    </React.Fragment>

  );
}

export default PostIntro;
