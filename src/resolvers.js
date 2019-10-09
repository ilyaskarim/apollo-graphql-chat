let {PubSub} = require("apollo-server");

const MESSAGESENT = "MESSAGESENT";
const CONVERSATIONCREATED = "CONVERSATIONCREATED";
const pubsub = new PubSub();

module.exports = {
  Subscription: {
    messageSent: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([MESSAGESENT]),
    },
    conversationCreated: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([CONVERSATIONCREATED]),
    },
  },
  Query: {
    messagesList: async function (parent, args, context) {
      const {Message} = context.database.models;
      return await Message.findAll();
    }
  },
  Mutation: {
    createConversation: async function (parent, args, context) {
      const {Conversation} = context.database.models;
      let create = await Conversation.create(args);
      pubsub.publish(CONVERSATIONCREATED, { conversationCreated: create });
      return create;
    },
    sendMessage: async function (parent, args, context) {
      const {Message} = context.database.models;
      let send = await Message.create({...args,isRead: false});
      pubsub.publish(MESSAGESENT, { messageSent: send });
      return send
    },
    login: async function (parent, args, context) {
      const {User} = context.database.models;
      const findUser = await User.findOne({where: {email: args.email}});
      if (findUser) {
        return findUser;
      }else {
        return Error("No user found or missing details");
      }
    },
    signup: async function (parent, args, context) {
      const {User} = context.database.models;
      const findUser = await User.findOne({where: {email: args.email}});
      if (findUser) {
        return findUser;
      }else {
        return await User.create(args);
      }
    },
  }
}