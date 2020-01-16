import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ArchivePosts from "../components/archivePosts"
import SEO from "../components/seo"

const CategoryTemplate = props => {
  const {
    data: {
      wpgraphql: { category },
    },
  } = props
  const { name, posts } = category
  return (
    <Layout>
      <SEO title={`Category: ${name}`} />
      <h1>Category: {name}</h1>
      <ArchivePosts posts={posts} />
    </Layout>
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
        posts {
          nodes {
            postId
            title(format: RENDERED)
            slug
          }
        }
      }
    }
  }
`
