import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ArchivePosts from "../components/archivePosts"
import SEO from "../components/seo"

const UserTemplate = props => {
  const {
    data: {
      wpgraphql: { user },
    },
  } = props
  const { name, description, posts } = user
  return (
    <Layout>
      <SEO title={`User: ${name}`} />
      <h1>User: {name}</h1>
      <p>{description}</p>
      <ArchivePosts posts={posts} />
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
        description
        avatar {
          url
          size
        }
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
