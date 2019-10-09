import React, {useState,useEffect} from 'react';
import './App.css';
import {useLazyQuery, useSubscription} from "@apollo/react-hooks"
import graphql from "./graphql";

const MessagesListQuery =  graphql.queries.messagesList;
const MESSAGE_SENT_SUBSCRIPTION =  graphql.subcriptions.messageSent

function App() {
  const [messages,setMessages] = useState([]);
  const [getMesssages,getMessagesData] = useLazyQuery(MessagesListQuery);
  const {data: newMessage, loading: newMessageLoading} = useSubscription(MESSAGE_SENT_SUBSCRIPTION, {});

  console.log(newMessage);

  useEffect(() => {
    getMesssages();
    setInterval(() => {
      var messagesInnerContainer = document.querySelector(".messagesInnerContainer");
      messagesInnerContainer.scrollTop = messagesInnerContainer.scrollHeight;
    }, 1000);
  },[])

  return (
    <div className="App">
      <div className="chatlayout" >
        <div className="header" >
          Chat System
        </div>
        <div className="content" >
          <div className="conversationsList" >
            <h4>conversations list</h4>
          </div>
          <div className="messages" >
            <h5></h5>
            {!newMessageLoading && JSON.stringify(newMessage)}
            <div className="messagesInnerContainer" >
              
              {
                (getMessagesData.data) ? getMessagesData.data.messagesList.map((message) => {
                  return <p>{message.message}</p>
                }) : "loading"
              }
            </div>
            <div className="messagesForm" >
              <textarea></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
