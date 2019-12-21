import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const TagTemplate = props => {
  const {
    data: {
      wpgraphql: { tag },
    },
  } = props
  const { name } = tag
  return (
    <Layout>
      <SEO title={`Tag ${name}`} />
      <h1>Tag: {name}</h1>
    </Layout>
  )
}

export default TagTemplate

export const pageQuery = graphql`
  query GET_TAG($id: ID!) {
    wpgraphql {
      tag(id: $id) {
        id
        name
        slug
      }
    }
  }
`
