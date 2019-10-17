const { withFilter } = require("graphql-subscriptions");
let { PubSub } = require("apollo-server");

const MESSAGESENT = "MESSAGESENT";
const CONVERSATIONCREATED = "CONVERSATIONCREATED";
const USER_CREATED = "USER_CREATED";

const pubsub = new PubSub();

module.exports = {
  Subscription: {
    messageSent: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(MESSAGESENT),
        (payload, variables) => {
          return payload.conversation === variables.conversation;
        }
      )
    },
    conversationCreated: {
      subscribe: () => pubsub.asyncIterator([CONVERSATIONCREATED])
    },
    userCreated: {
      subscribe: () => pubsub.asyncIterator([USER_CREATED])
    }
  },
  Query: {
    messagesList: async function(parent, args, context) {
      const { Message } = context.database.models;
      const { conversation } = args;
      return await Message.findAll({
        order: [["id", "ASC"]],
        where: {
          conversation: conversation
        }
      });
    },
    conversationList: async function(parent, args, context) {
      const { Conversation } = context.database.models;
      return await Conversation.findAll();
    },
    userList: async function(parent, args, context) {
      const { User } = context.database.models;
      return await User.findAll({
        order: [["id", "DESC"]]
      });
    }
  },
  Message: {
    conversation: async function(parent, args, context) {
      const { Conversation } = context.database.models;
      return await Conversation.findOne({ id: parent.conversation });
    }
  },
  Conversation: {
    userOne: async function(parent, args, context) {
      const { User } = context.database.models;
      const finduser = await User.findAll({
        where: {
          id: parent.userOne
        },
        limit: 1
      });
      return finduser[0];
    },
    userTwo: async function(parent, args, context) {
      const { User } = context.database.models;
      const finduser = await User.findAll({
        where: {
          id: parent.userTwo
        },
        limit: 1
      });
      return finduser[0];
    }
  },
  Mutation: {
    createConversation: async function(parent, args, context) {
      const { Conversation } = context.database.models;
      let create = await Conversation.create(args);
      pubsub.publish(CONVERSATIONCREATED, { conversationCreated: create });
      return create;
    },
    sendMessage: async function(parent, args, context) {
      const { Message } = context.database.models;
      let send = await Message.create({ ...args.input, isRead: false });
      pubsub.publish(MESSAGESENT, { messageSent: send });
      return send;
    },
    login: async function(parent, args, context) {
      const { User } = context.database.models;
      const findUser = await User.findOne({ where: { email: args.email } });
      if (findUser) {
        return findUser;
      } else {
        return Error("No user found or missing details");
      }
    },
    signup: async function(parent, args, context) {
      const { User } = context.database.models;
      const findUser = await User.findOne({ where: { email: args.email } });
      if (findUser) {
        return findUser;
      } else {
        const create = await User.create(args);
        pubsub.publish(USER_CREATED, { userCreated: create });
        return create;
      }
    }
  }
};
