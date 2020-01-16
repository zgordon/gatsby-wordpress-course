/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from "react"
import { ApollloProvider, ApolloProvider } from "@apollo/react-hooks"
import ApolloClient from "apollo-boost"

export const wrapRootElement = ({ element }) => {
  const client = new ApolloClient({
    uri: `http://gatsby-wordpress.local/graphql`,
  })

  return <ApolloProvider client={client}>{element}</ApolloProvider>
}
