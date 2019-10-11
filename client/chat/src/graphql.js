import gql from "graphql-tag"
export default {
  subcriptions: {
    messageSent: gql`
      subscription {
        messageSent {
          id
          message
        }
      }
    `,
    conversationCreated: gql`
      subscription {
        conversationCreated {
          id
          userOne {
            id
          }
          userTwo {
            id
          }
        }
      }
    `
  },
  mutation: {
    sendMessage: gql`
      mutation sendMessage($message: String, $sender: Int, $reciever: Int, $conversation: Int) {
        sendMessage(input: {message: $message, sender: $sender, reciever: $reciever, conversation: $conversation}) {
          id
          message
          conversation {
            id
          }
        }
      }
    `
  },
  queries: {
    messagesList: gql`
      {
        messagesList {
          message
        }
      }
    `,
    conversationList: gql`
      {
        conversationList {
          id
          userOne {
            id
            name
          }
          userTwo {
            id
            name
          }
        }
      }
    `
  }
}