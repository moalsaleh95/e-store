import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import resolvers from './resolvers';

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    cors: {
    origin: [
      'https://e-store-ciox.vercel.app',
      'http://localhost:3000'
    ],
    credentials: true,
  },
});

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});