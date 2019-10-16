import React,{useState,useEffect} from "react"
import graphql from "./graphql";
import {useLazyQuery, useSubscription} from "@apollo/react-hooks"

const MessagesListQuery =  graphql.queries.messagesList;
const MESSAGE_SENT_SUBSCRIPTION =  graphql.subcriptions.messageSent

export const MessagesContainer = (props) => {
  const {currentConversation} = props;
  const [realtimeMessages, setRealtimeMessages] = useState([]);
  const [messages,setMessages] = useState([]);
  const [getMesssages,getMessagesData] = useLazyQuery(MessagesListQuery,{
    fetchPolicy: 'no-cache'
  });
  const {data: newMessage, loading: newMessageLoading} = useSubscription(MESSAGE_SENT_SUBSCRIPTION, {
    variables: {
      conversation: currentConversation
    }
  });

  useEffect(() => {
    if (newMessage) {
      setRealtimeMessages([...realtimeMessages,newMessage.messageSent])
      setTimeout(() => {
        scrollToBottomMessages();
      },100)
    }
  },[newMessage]);

  const scrollToBottomMessages = () => {
    var messagesInnerContainer = document.querySelector(".messagesInnerContainer");
    messagesInnerContainer.scrollTop = messagesInnerContainer.scrollHeight;
  }

  
  useEffect(() => {
    setRealtimeMessages([]);
    getMesssages({
      variables: {
        conversation: currentConversation
      }
    });
  },[currentConversation]);

  return (
    <div className="messagesInnerContainer" >
      {
        (getMessagesData.data) ? [...getMessagesData.data.messagesList,...realtimeMessages].map((message) => {
          return <p>{message.message}</p>
        }) : "loading"
      }
      {
        (getMessagesData.data && [...getMessagesData.data.messagesList, ...realtimeMessages].length == 0) ? "No Message" : ""
      }
    </div>
  )
}