import React, { useState, useEffect } from "react";
import "./ChatSystem.css";
import { useLazyQuery, useSubscription } from "@apollo/react-hooks";
import graphql from "./../../graphql";
import Conversations from "./Conversations";
import { MessageSendForm } from "./MessageSendForm";
import { MessagesContainer } from "./MessagesContainer";
import { UsersList } from "./UsersList";

function ChatSystem() {
  const [currentConversation, setCurrentConversation] = useState(null);

  return (
    <div className="ChatSystem">
      <div className="chatlayout">
        <div className="header">
          <h1>Chat System</h1>
        </div>
        <div className="content">
          <div className="conversationsList">
            <h4>conversations list</h4>
            <Conversations setCurrentConversation={setCurrentConversation} />
          </div>
          <div className="messages">
            <h5> Messages</h5>
            {currentConversation ? (
              <div>
                <MessagesContainer currentConversation={currentConversation} />
                <MessageSendForm currentConversation={currentConversation} />
              </div>
            ) : (
              <h3 className="h3">Please select a converation</h3>
            )}
          </div>
          <div className="usersList">
            <h5> Users</h5>
            <UsersList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSystem;
