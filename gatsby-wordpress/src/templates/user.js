import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const UserTemplate = props => {
  const {
    data: {
      wpgraphql: { user },
    },
  } = props
  const { name } = user
  return (
    <Layout>
      <h1>User: {name}</h1>
    </Layout>
  )
}

export default UserTemplate

export const pageQuery = graphql`
  query GET_USER($id: ID!) {
    wpgraphql {
      user(id: $id) {
        id
        name
      }
    }
  }
`
