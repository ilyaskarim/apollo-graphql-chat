module.exports = `
  type User {
    id: Int
    name: String
    email: String
  }
  type Conversation {
    id: Int
    userOne: Int
    userTwo: Int
  }
  type Message {
    id: Int
    conversation: Conversation
    message: String
    sender: User
    reciever: User
    isRead: Boolean
  }
  type Query {
    messagesList: [Message]
  }
  type Subscription {
    messageSent: Message
    conversationCreated: Conversation
  }
  type Mutation {
    login(email: String!): User
    signup(name: String!, email: String!): User
    createConversation(userOne: Int, userTwo: Int): Conversation
    sendMessage(message: String, sender: Int, reciever: Int): Message
  }
`