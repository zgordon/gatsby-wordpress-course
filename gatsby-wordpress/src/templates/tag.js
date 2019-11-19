import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import ArchivePosts from "../components/archivePosts"

const TagTemplate = props => {
  const {
    data: {
      wpgraphql: { tag },
    },
  } = props
  const { name, posts } = tag
  return (
    <Layout>
      <h1>Tag: {name}</h1>
      <ArchivePosts posts={posts} />
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
        posts {
          nodes {
            title(format: RENDERED)
            slug
          }
        }
      }
    }
  }
`
