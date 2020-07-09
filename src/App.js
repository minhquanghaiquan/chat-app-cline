import React, { useEffect, createContext , useReducer } from 'react';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import DashboardPage from './Pages/DashboardPage'
import IndexPage from './Pages/IndexPage';
import ChatroomPage from './Pages/ChatroomPage';
import makeToast from './Toaster';
import io from "socket.io-client";
import { createHashHistory } from 'history'



//Reducer
import { reducer, initialState } from './reducers/userReducer';
import Navbar from './Pages/NavBar';
export const UserContext = createContext()


function App() {
  const [socket, setSocket] = React.useState(null);
  const [state,dispatch] = useReducer(reducer,initialState);
  const history = createHashHistory();
  

  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");
    if (token && !socket) {
      const newSocket = io("http://localhost:5000", {
        query: {
          token: localStorage.getItem("CC_Token"),
        },
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        makeToast("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        makeToast("success", "Socket Connected!");
      });

      setSocket(newSocket);
    }
  };

 
  //check user
  useEffect(()=>{
    console.log('check user')
    const token = localStorage.getItem("CC_Token");
    const user = localStorage.getItem("user");
    if(token && user){
      console.log(user)
      dispatch({type:"USER" , payload:JSON.parse(user) })
    }else{
      history.push('/login')
    }
  },[])

  useEffect(() => {
    setupSocket();
  }, []);


  return (
    <UserContext.Provider value= {{state, dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route path="/" component={IndexPage} exact />
          <Route
            path="/login"
            render={() => <LoginPage setupSocket={setupSocket} />}
            exact
          />
          <Route path="/register" component={RegisterPage} exact />
          <Route
            path="/dashboard"
            render={() => <DashboardPage socket={socket} />}
            exact
          />
          <Route
            path="/chatroom/:id"
            render={() => <ChatroomPage socket={socket} />}
            exact
          />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
