import React, { useState, useEffect, useRef } from 'react';
import { withRouter} from 'react-router-dom';
import Axios from 'axios';
import DashboardPageTwo from './DashboardPageTwo'
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactEmoji from 'react-emoji';
import '../Styles/message.css'
const URL = 'https://be-chatapp.herokuapp.com/'



const ChatroomPage = ({ match,socket}) => {
    const chatroomId= match.params.id;
    
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const messageRef =useRef();
    const [userId, setUserId] = useState("");
    const [trigger, setTrigger] = useState(true)


    const sendMessage = () => {
        if (socket) {
            socket.emit("chatroomMessage", {
                chatroomId,
                message: messageRef.current.value,
            });
            
          messageRef.current.value = "";
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("CC_Token");
        if (token) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUserId(payload.id);
        }
        if (socket) {
            socket.on("newMessage", (message) => {
                console.log('in here')
                const newMessages = [...messages, message];
                setMessages(newMessages);
          });
        }
        //eslint-disable-next-line
      }, [messages]);

    useEffect(() => {

        if (socket) {
          socket.emit("joinRoom", {
            chatroomId,
          });
        }
    
        return () => {
          if (socket) {
            socket.emit("leaveRoom", {
              chatroomId,
            });
          }
        };
       
    }, [messages]);

    useEffect(()=> {
      Axios
        .get(`${URL}chatroom/${chatroomId}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("CC_Token"),
          },
        })
        .then((response) => {
          setMessages(response.data)
        })
        .catch((err) => {
          console.log(err)
        });
    },[trigger])

    useEffect(()=> {
      Axios
      .post(`${URL}getroomname`,{chatroomId} ,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        setRoomName(response.data.roomName)
      })
      .catch((err) => {
        console.log(err)
      });
    },[trigger])

    return (
      <div className="card">
        <div className="container-chat">
          <div class="left">
            <DashboardPageTwo setTrigger={setTrigger} trigger={trigger}/>
          </div>

          <div className="right right-chat">
                <div className="cardHeaderChat"> <b>{roomName} </b></div>
                
                <ScrollToBottom className="chatroomContent">
                  {messages.map((message, i) => {
                    
                    if(userId === message.userId) {
                      return (
                        <div className="messageContainer justifyEnd">
                          <p className="sentText pr-10">{message.name}</p>
                          <div className="messageBox backgroundBlue">
                            <p className="messageText colorWhite">{ReactEmoji.emojify(message.message)}</p>
                          </div>
                        </div>
                      )
                    }else {
                      return (
                        <div className="messageContainer justifyStart">
                          <div className="messageBox backgroundLight">
                            <p className="messageText colorDark">{ReactEmoji.emojify(message.message)}</p>
                          </div>
                          <p className="sentText pl-10 ">{message.name}</p>
                      </div>
                      )
                    }
                  })}
                </ScrollToBottom>
                
                <div className="chatroomActions">
                    
                  <input
                      type="text"
                      name="message"
                      placeholder="Say something!"
                      ref={messageRef}
                  />
                    
                  <button className="join" onClick={sendMessage} >
                      Send
                  </button>
                  
              </div>
          </div>
        </div>
      </div>
    );
};



export default withRouter(ChatroomPage);
