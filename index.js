import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';

dotenv.config();

import server from './connectors/apollo.js'
const PORT = process.env.PORT

const { url } = await startStandaloneServer(server, {
    listen: { port: PORT }
})

console.log(`Server ready at port`, PORT)

 