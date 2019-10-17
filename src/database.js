const Sequelize = require("sequelize");

// Option 1: Passing parameters separately
const database = new Sequelize("chat", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

// database.sync({force: true});

module.exports = {
  database: database,
  models: {
    User: database.define("user", {
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      }
    }),
    Conversation: database.define("conversation", {
      userOne: {
        type: Sequelize.INTEGER
      },
      userTwo: {
        type: Sequelize.INTEGER
      }
    }),
    Message: database.define("message", {
      message: {
        type: Sequelize.STRING
      },
      conversation: {
        type: Sequelize.INTEGER
      },
      sender: {
        type: Sequelize.INTEGER
      },
      reciever: {
        type: Sequelize.INTEGER
      },
      isRead: {
        type: Sequelize.BOOLEAN
      }
    })
  }
};
