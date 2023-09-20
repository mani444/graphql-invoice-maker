import express from 'express'
import { ApolloServer } from '@apollo/server'
import cors from 'cors'
import bodyParser from 'body-parser'
import { expressMiddleware } from '@apollo/server/express4'

const startgqlServer = async () => {
  const app = express()
  const resolvers = {
    Query: {
      getInvoices: () => [
        { id: '1', title: 'First Invoice', body: 'This is the first invoice' },
        { id: '2', title: 'Second Invoice', body: 'This is the second invoice' }
      ]
    }
  }
  const gqlServer = new ApolloServer({
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

  await gqlServer.start()
  app.use("/graphql", expressMiddleware(gqlServer));

  app.use("/", (req, res) => {
    res.json({ message: "gqlServer running" })
  })

  const port = process.env.PORT || 8000;

  app.listen(port, () => console.log("gqlServer Started"))
}

startgqlServer()