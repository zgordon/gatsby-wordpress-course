import React from "react"
import { graphql } from "gatsby"
import Pagination from "../components/pagination"
import Layout from "../components/layout"

const Posts = props => {
  const {
    data: {
      wpgraphql: { posts },
    },
    pageContext: { pageNumber, hasNextPage },
  } = props

  const currentPage = pageNumber ? `- Page ${pageNumber}` : ``
  return (
    <Layout>
      <h1>Blog Archive {currentPage}</h1>
      {posts.nodes.map(post => (
        <h2 key={post.id}>{post.title}</h2>
      ))}
      <Pagination pageNumber={pageNumber} hasNextPage={hasNextPage} />
    </Layout>
  )
}

export default Posts

export const pageQuery = graphql`
  query GET_POSTS($ids: [ID]) {
    wpgraphql {
      posts(where: { in: $ids }) {
        nodes {
          id
          title
        }
      }
    }
  }
`
