import React, { useState, useEffect } from "react";
import { useLazyQuery, useSubscription } from "@apollo/react-hooks";
import graphql from "./graphql";

const ConversationListQuery = graphql.queries.conversationList;
const ConversationCreatedSubscription =
  graphql.subcriptions.conversationCreated;

const Conversations = () => {
  const [realtimeAddedConversations, setRealtimeAddedConversations] = useState(
    []
  );
  const [getConversations, getConversationsData] = useLazyQuery(
    ConversationListQuery
  );
  const {
    data: newConversation,
    loading: newConversationLoading
  } = useSubscription(ConversationCreatedSubscription, {});

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    if (newConversation) {
      setRealtimeAddedConversations([
        newConversation.conversationCreated,
        ...realtimeAddedConversations
      ]);
    }
    console.log(newConversation, "conversactuion");
  }, [newConversation]);

  return (
    <div>
      Your Conversations
      {getConversationsData.data
        ? [
            ...realtimeAddedConversations,
            ...getConversationsData.data.conversationList
          ].map((users, index) => {
            return (
              <p key={index}>
                {users.id}
                <span key={index}>{users.userOne.name}</span>
              </p>
            );
          })
        : "loading"}
    </div>
  );
};

export default Conversations;
