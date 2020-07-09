import React, { useContext } from 'react';
import {Link ,useHistory} from 'react-router-dom'
import { UserContext } from '../App';
import '../Styles/navbar.css';




const Navbar = () => {
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()

    const renderList = ()=>{
        if(state){
            return (
          
            <nav class="nav nav-active">
                <ul>
                    <li key="2"><Link to="/" class="nav-item is-active" active-color="orange">Home</Link></li>
                    <li key="2"><Link to="/dashboard" class="nav-item" active-color="green">Chat Rooms</Link></li>
                    
                    <li  key="5" className="logout">
                        <button
                            className="button-logout"
                            onClick={()=>{
                            localStorage.clear()
                            dispatch({type:"CLEAR"})
                            history.push('/login')
                            }}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
            )
        }else{
          return (
            <nav class="nav nav-preactive">
                <ul>
                    <li key="2"><Link to="/login" class="nav-item" active-color="red">Login</Link></li>
                    <li key="3"><Link to="/register" class="nav-item" active-color="red">Register</Link></li>
                </ul>
             </nav>
          )
        }
      }

    return (
        <>
            {renderList()}
        </>
    );
};


export default Navbar;