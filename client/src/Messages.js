import React, {useState,useEffect} from 'react';
import './App.css';
import {useLazyQuery, useSubscription} from "@apollo/react-hooks"
import graphql from "./graphql";
import Conversations from "./Conversations"
import {MessageSendForm} from "./MessageSendForm";
import {MessagesContainer} from "./MessagesContainer"
import {UsersList} from "./UsersList";



function Messages() {

  const [currentConversation, setCurrentConversation] = useState(null);

  return (
    <div className="App">
      <div className="chatlayout" >
        <div className="header" >
          Chat System
        </div>
        <div className="content" >
          <div className="conversationsList" >
            <h4>conversations list</h4>
            <Conversations  setCurrentConversation={setCurrentConversation} />
          </div>
          <div className="messages" >
            <h5></h5>
            {  
              (currentConversation) ? (
                <div><MessagesContainer currentConversation={currentConversation} /><MessageSendForm currentConversation={currentConversation} /></div>
              ) : (
                <div>
                  Please select a converation
                </div>
              )
            }
          </div>
          <div className="usersList" >
            <UsersList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
