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
          userOne
          userTwo
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
          userOne
          userTwo
        }
      }
    `
  }
}