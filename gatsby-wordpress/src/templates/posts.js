import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ArchivePosts from "../components/archivePosts"

import Pagination from "../components/pagination"
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
      <ArchivePosts posts={posts} title={false} />
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
          uri
          slug
          date
          content: excerpt
          author {
            name
            slug
            avatar(size: 100) {
              url
            }
          }
        }
      }
    }
  }
`
