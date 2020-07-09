import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import makeToast from '../Toaster';
import '../Styles/chat.css'



const DashboardPage = (props) => {

    const [chatrooms , setChatrooms]= useState([]);
    const [newRoom , setNewRoom]= useState('');
    const [joinRoom , setJoinRoom]= useState('');

    const getChatrooms = () => {
      Axios
        .get("http://localhost:5000/chatroom", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("CC_Token"),
          },
        })
        .then((response) => {
          setChatrooms(response.data);
        })
        .catch((err) => {
          setTimeout(getChatrooms, 3000);
        });
    };

    useEffect(() => {
      getChatrooms();
    }, []);

    const createRoom = async () => {
        Axios
        .post("http://localhost:5000/chatroom",{ name: newRoom } ,{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("CC_Token"),
          },
        })
        .then((response) => {
          getChatrooms();
        })
        .then(() => {
          setNewRoom('');
        })
        .catch((err) => {
          makeToast("error", err.response.data.message);
        });
    }

    const JoinRoom = async () => {
      Axios
      .post("http://localhost:5000/chatroom/joinroom",{ name: joinRoom } ,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        console.log('set join room')
        setJoinRoom('');
        getChatrooms();
        
      })
      .catch((err) => {
        makeToast("error", err.response.data.message);
      });
    }


    const leaveFromRoom = async (chatroomId) => {
      Axios
      .post("http://localhost:5000/chatroom/leavefromroom",{ chatroomId } ,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        getChatrooms();
      })
      .catch((err) => {
        makeToast("error", err.response.data.message);
      });
    }


    if(!chatrooms) return 'Loading...'

    return (
      <div className="card">
        <div class="container-chat">
          <div class="left">
            <div class="top">

              <div className="cardHeader"><b>CHATROOMS</b></div>

              <div className="cardBody">
                <input
                  type="text"
                  name="joinRoom"
                  id="joinRoom"
                  placeholder="Join in room...."
                  value={joinRoom}
                  onChange={(e) => setJoinRoom(e.target.value)}
                />
                <button onClick={JoinRoom}>Join</button>
              </div>


              <div className="cardBody">
                <input
                  type="text"
                  name="chatroomName"
                  id="chatroomName"
                  placeholder="New chat room..."
                  value={newRoom}
                  onChange={(e) => setNewRoom(e.target.value)}
                />
                <button onClick={createRoom}>Create</button>
              </div>

            </div>

            <div className="chatrooms">
            {chatrooms.map((chatroom) => (
              <div key={chatroom._id} className="chatroom">
                <div className="name">{chatroom.name}</div>
                <div className="name2">
                  <Link to={"/chatroom/" + chatroom._id}><button>Chat</button></Link>
                  <button onClick={() => leaveFromRoom(chatroom._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
            </div>

          </div>
          <div class="right">
          
            
              <div className="right-dashboard">
                <div>
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                </div>
              </div>
          
          </div> 
        </div>   
    </div>
    );
};





export default DashboardPage;
