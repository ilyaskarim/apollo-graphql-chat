import gql from "graphql-tag"
export default {
  subcriptions: {
    userCreated: gql`
      subscription {
        userCreated {
          name
          email
        }
      }
    `,
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
            name
            email
          }
          userTwo {
            id
            name
            email
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
    `,
    createConversation: gql`
      mutation createConversation($userOne: Int, $userTwo: Int) {
        createConversation(userOne: $userOne, userTwo: $userTwo) {
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
  },
  queries: {
    userList: gql`
      {
        userList {
          id
          name
          email
        }
      }
    `,
    messagesList: gql`
      query messagesList($conversation: Int)  {
        messagesList(conversation: $conversation) {
          id
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