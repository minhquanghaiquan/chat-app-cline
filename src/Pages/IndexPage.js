import React, { useEffect } from 'react';
import '../Styles/home.css'



const IndexPage = (props) => {
    
    useEffect(() => {
        const token = localStorage.getItem("CC_Token")
        if(!token) {
            props.history.push("/login");
        }else {
            props.history.push("/");
        }
    }, []);

    return (
        <div className="home">
            <div className="home-right">
                <h1>Let's start with us....</h1>
                <p><i>Everything so easy with ChatApp !!!</i></p>
            </div>
            <div className="home-left">
                <h1>Hello, Friend!</h1>
                <p>That's home.....!!!</p>
            </div>
        </div>
    );
};





export default IndexPage;
