import React, {useState,useEffect} from 'react';
import {useLazyQuery, useSubscription} from "@apollo/react-hooks"
import graphql from "./graphql";

const ConversationListQuery = graphql.queries.conversationList;
const ConversationCreatedSubscription = graphql.subcriptions.conversationCreated;

const Conversations = () => {
  const [realtimeAddedConversations, setRealtimeAddedConversations] = useState([]);
  const [getConversations,getConversationsData] = useLazyQuery(ConversationListQuery);
  const {data: newConversation, loading: newConversationLoading} = useSubscription(ConversationCreatedSubscription, {});

  useEffect(() => {
    getConversations();
  },[])

  useEffect(() => {
    if (newConversation) {
      setRealtimeAddedConversations([newConversation.conversationCreated,...realtimeAddedConversations])
    }
  },[newConversation])

  return (
    <div>
      Your Conversations
      {
        (getConversationsData.data) ? [...realtimeAddedConversations,...getConversationsData.data.conversationList ].map((cc) => {
          return <p>{cc.userOne.name} and {cc.userTwo.name}</p>
        }) : "loading"
      }
    </div>
  )
}

export default Conversations