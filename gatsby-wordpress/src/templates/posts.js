import React from "react"
import { graphql } from "gatsby"
import Pagination from "../components/pagination"
const Posts = props => {
  const {
    data,
    data: {
      wpgraphql: { posts },
    },
    pageContext: { pageNumber, hasNextPage },
  } = props

  console.log(props)
  const currentPage = pageNumber ? `- Page ${pageNumber}` : ``
  console.log(data)
  console.log(posts.nodes)
  return (
    <div>
      <h1>Blog Archive {currentPage}</h1>
      {posts.nodes.map(post => (
        <h2
          key={post.id}
          // dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        >
          {post.title}
        </h2>
      ))}
      <Pagination pageNumber={pageNumber} hasNextPage={hasNextPage} />
    </div>
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
