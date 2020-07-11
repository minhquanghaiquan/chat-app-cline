import React, { useContext } from 'react';
import Axios from 'axios';
import makeToast from '../Toaster';
import { withRouter, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import '../Styles/login.css'
const URL = 'https://be-chatapp.herokuapp.com/'

const LoginPage = (props) => {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory();
  
    const loginUser = () => {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
  
      Axios
        .post(`${URL}user/login`, {
          email,
          password,
        })
        .then((response) => {
          makeToast("success", response.data.message);
          localStorage.setItem("CC_Token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          dispatch({type:"USER" , payload: response.data.user })
          props.setupSocket();
          history.push('/dashboard');
        })
        .catch((err) => {
          if (
            err &&
            err.response &&
            err.response.data &&
            err.response.data.message
          )
            makeToast("error", err.response.data.message);
        });
    };

    return (
        <div class="container-signin">
          <div class="form-container sign-in-container">
            <div className="form">
              <h1>Sign in</h1>
              <input 
                  type="email" 
                  placeholder="Email" 
                  name="email"
                  id="email"
                  ref={emailRef}
              />
              <input 
                  type="password" 									
                  placeholder="Password" 
                  name="password"
                  id="password"
                  ref={passwordRef}
              />
              <a href="google.com">Forgot your password?</a>
              <button onClick={loginUser}>Login</button>
            </div>
          </div>
          <div class="overlay-container">
            <div class="overlay">
              <div class="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
              </div>
            </div>
          </div>
      </div>
    );
};





export default withRouter(LoginPage);
