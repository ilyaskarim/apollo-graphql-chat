let database = require("./src/database.js")
let schema = require("./src/schema.js");
let resolvers = require("./src/resolvers.js");
let {ApolloServer} = require("apollo-server");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
  typeDefs: schema, 
  resolvers: resolvers,
  subscriptions: {
    path: '/subscriptions'
  },
  context: ({req,res}) => {
    console.log(req.headers.authorization)
    return {
      database
    }
  }
});

// The `listen` method launches a web server.
server.listen().then(({ url,subscriptionsUrl ,subscriptionsPath}) => {
  console.log(`🚀  Server ready at ${url}`);
  console.log(`realtime here at ${subscriptionsUrl} and path ${subscriptionsPath}`)
});