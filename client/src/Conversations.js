import React, {useState,useEffect} from 'react';
import {useLazyQuery, useSubscription} from "@apollo/react-hooks"
import graphql from "./graphql";

const ConversationListQuery = graphql.queries.conversationList;
const ConversationCreatedSubscription = graphql.subcriptions.conversationCreated;

const Conversations = (props) => {
  const {setCurrentConversation} = props;
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
          return (
            <p onClick={ () => {
              setCurrentConversation(null);
              setTimeout(() => {
                setCurrentConversation(cc.id);
              },500)
            } } >
              <a href="#" >{cc.userOne.name} and {cc.userTwo.name}</a>
            </p>
          )
        }) : "loading"
      }
    </div>
  )
}

export default Conversations