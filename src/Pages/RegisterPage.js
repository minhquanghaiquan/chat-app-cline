import React from 'react';
import axios from 'axios';
import makeToast from '../Toaster'
import '../Styles/login.css'
import { useHistory } from 'react-router';
const URL = 'https://be-chatapp.herokuapp.com/'


const RegisterPage = () => {
    const nameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();
    const history = useHistory();


    const registerUser = (props) => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios
        .post(`${URL}user/register`, {
          name,
          email,
          password,
        })
        .then((response) => {
          makeToast("success", response.data.message);
          history.push("/login");
        })
        .catch((err) => {
          // console.log(err);
          if (
            err &&
            err.response &&
            err.response.data &&
            err.response.data.message
          )
            makeToast("error", err.response.data.message);
        });
    }

    return (
     
    <div class="container-signin">

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
          </div>
        </div>
      </div>

      <div class="form-container sign-in-container">
        <div className="form">
          <h1>Register</h1>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            ref={nameRef}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abc@example.com"
            ref={emailRef}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your Password"
            ref={passwordRef}
          />
            <button onClick={registerUser}>Register</button>
        </div>
      </div>
    </div>
    );
};





export default RegisterPage;
