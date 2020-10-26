const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    todos: [Todo]!
  }
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }
  type Mutation {
    addTodo(text: String!): Todo
    updateTodo(id: ID!): Todo
  }
`;

const todos = {};
let todoIndex = 0;

const resolvers = {
  Query: {
    todos: () => Object.values(todos),
  },
  Mutation: {
    addTodo: (_, { text }) => {
      todoIndex++;
      const id = todoIndex;
      todos[id] = { id, text, completed: false };
      return todos[id];
    },
    updateTodo: (_, { id }) => {
      todos[id].completed = true;
      return todos[id];
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

exports.handler = server.createHandler();
