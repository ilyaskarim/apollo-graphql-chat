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
    `
  },
  queries: {
    messagesList: gql`
      {
        messagesList {
          message
        }
      }
    `
  }
}