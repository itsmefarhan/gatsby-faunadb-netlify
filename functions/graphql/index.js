const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.FAUNADB });

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

const resolvers = {
  Query: {
    todos: async (parent, args, { user }) => {
      if (!user) {
        return [];
      } else {
        const result = await client.query(
          q.Paginate(q.Match(q.Index("todos_by_user"), user))
        );
        return result.data.map(([ref, text, completed]) => ({
          id: ref.id,
          text,
          completed,
        }));
      }
    },
  },
  Mutation: {
    addTodo: async (_, { text }, { user }) => {
      if (!user) {
        throw new Error("User not found");
      }
      const result = await client.query(
        q.Create(q.Collection("todos"), {
          data: {
            text,
            completed: false,
            owner: user,
          },
        })
      );

      return {
        ...result.data,
        id: result.ref.id,
      };
    },
    updateTodo: async (_, { id }, { user }) => {
      if (!user) {
        throw new Error("User not found");
      }
      const result = await client.query(
        q.Update(q.Ref(q.Collection("todos"), id), {
          data: {
            completed: true,
          },
        })
      );
      return {
        ...result.data,
        id: result.ref.id,
      };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ context }) => {
    if (context.clientContext.user) {
      return { user: context.clientContext.user.sub };
    } else {
      return {};
    }
  },
  introspection: true,
  playground: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
