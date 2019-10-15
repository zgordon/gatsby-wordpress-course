import React from "react"
import { graphql } from "gatsby"

const CategoryTemplate = props => {
  const {
    data: {
      wpgraphql: { category },
    },
  } = props
  const { name } = category
  return (
    <div>
      <h1>Category: {name}</h1>
    </div>
  )
}

export default CategoryTemplate

export const pageQuery = graphql`
  query GET_CATEGORY($id: ID!) {
    wpgraphql {
      category(id: $id) {
        id
        name
        slug
      }
    }
  }
`
