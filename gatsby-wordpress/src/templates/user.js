import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ArchivePosts from "../components/archivePosts"

const UserTemplate = props => {
  const {
    data: {
      wpgraphql: { user },
    },
  } = props
  const { id, name, description } = user
  console.log(id)
  return (
    <Layout>
      <h1>User: {name}</h1>
      <p>{description}</p>
      <ArchivePosts posts={user.posts} />
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
            title(format: RENDERED)
            slug
          }
        }
      }
    }
  }
`
