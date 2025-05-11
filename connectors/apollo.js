import { ApolloServer } from '@apollo/server'
import typeDefs from '../model/queries/schema.js';
import resolvers from '../controllers/resolvers.js'
// server setup
const server = new ApolloServer({typeDefs, resolvers})

export default server