import React from "react"
import { graphql } from "gatsby"

const UserTemplate = props => {
  const {
    data: {
      wpgraphql: { user },
    },
  } = props
  const { name } = user
  return (
    <div>
      <h1>User: {name}</h1>
    </div>
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
