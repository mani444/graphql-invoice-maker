const express = require('express')
const { ApolloServer } = require('@apollo/server')
const cors = require('cors')
const bodyParser = require('body-parser')
const { expressMiddleware } = require('@apollo/server/express4')

const startServer = async () => {
    const app = express()
    const resolvers = {
        Query: {
            getInvoices: () => [
                { id: '1', title: 'First Invoice', body: 'This is the first invoice' },
                { id: '2', title: 'Second Invoice', body: 'This is the second invoice' }
            ]
        }
    }
    const server = new ApolloServer({
        typeDefs: `
            type Invoice {
                id: ID!
                title: String!
                body: String
                tags: [String]
            }

            type Query {
                getInvoices: [Invoice]
            }
        `,
        resolvers,
    })
    app.use(bodyParser.json());

    app.use(cors());

    await server.start()
    app.use("/graphql", expressMiddleware(server));

    app.listen(8000, () => console.log("Server Started"))
}

startServer()