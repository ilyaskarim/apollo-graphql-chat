import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import graphql from "../../graphql";

const MESSAGE_SEND_MUTATION = graphql.mutation.sendMessage;

export const MessageSendForm = props => {
  const { currentConversation } = props;
  const [message, setMessage] = useState("");
  const [sendMessageToGraphQL, { data }] = useMutation(MESSAGE_SEND_MUTATION);

  const sendMessage = () => {
    if (message) {
      sendMessageToGraphQL({
        variables: {
          message: message,
          conversation: currentConversation,
          sender: 1,
          receiver: 1
        }
      });
      setMessage("");
    } else {
      // alert("Please enter message");
    }
  };

  return (
    <form
      className="messagesForm"
      onSubmit={e => {
        e.preventDefault();
        sendMessage();
      }}
    >
      <input value={message} onChange={e => setMessage(e.target.value)} />
      <button>Send Message</button>
    </form>
  );
};
