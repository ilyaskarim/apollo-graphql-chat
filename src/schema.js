module.exports = `
  type User {
    id: Int
    name: String
    email: String
  }
  type Conversation {
    id: Int
    userOne: User
    userTwo: User
  }
  type Message {
    id: Int
    conversation: Conversation
    message: String
    sender: User
    reciever: User
    isRead: Boolean
  }
  input MessageSendInput {
    message: String
    sender: Int 
    reciever: Int
    conversation: Int
  }
  type Query {
    messagesList(conversation: Int): [Message]
    conversationList: [Conversation]
    userList: [User]
  }
  type Subscription {
    messageSent(conversation: Int): Message
    conversationCreated: Conversation
    userCreated: User
  }
  type Mutation {
    login(email: String!): User
    signup(name: String!, email: String!): User
    createConversation(userOne: Int, userTwo: Int): Conversation
    sendMessage(input: MessageSendInput): Message
  }
`