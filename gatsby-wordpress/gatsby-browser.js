import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"

// Wraps the entire Gatsby app with Apollo.
export const wrapRootElement = ({ element }) => {
  // Register a new Apollo client.
  const client = new ApolloClient({
    // Change this to your GraphQL endpoint.
    uri: "http://gatsby-3.local/graphql",
  })

  // Wrap the element.
  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
