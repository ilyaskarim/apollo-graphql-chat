import React, { useState, useEffect } from "react";
import "./App.css";
import { useLazyQuery, useSubscription } from "@apollo/react-hooks";
import graphql from "./graphql";
import Conversations from "./Conversations";
import { MessageSendForm } from "./MessageSendForm";
import { MessagesContainer } from "./MessagesContainer";

function App() {
  return (
    <div className="App">
      <div className="chatlayout">
        <div className="header">
          <h1>Chat System</h1>
        </div>
        <div className="content">
          <div className="conversationsList">
            <h4>Conversations</h4>
            <Conversations />
          </div>
          <div className="messages">
            <h5>Messages</h5>
            <MessagesContainer />
            <MessageSendForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
