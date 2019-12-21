import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Comments from "../components/comments"
import CommentForm from "../components/commentForm"
import { CommentProvider } from "../hooks/commentContext"

const Post = props => {
  const {
    data: {
      wpgraphql: { post },
    },
  } = props
  const { postId, title, content } = post

  const [commentId, setCommentId] = useState(null)

  const commentData = {
    postId: postId,
    commentId: commentId,
    updateCommentId: id => {
      setCommentId(id)
    },
  }

  return (
    <Layout>
      <SEO title={`${title}`} />
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <hr />
      <CommentProvider value={commentData}>
        <Comments post={post} />
        {!commentData.commentId && <CommentForm />}
      </CommentProvider>
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  fragment CommentFields on WPGraphql_Comment {
    date
    id
    author {
      ... on WPGraphql_CommentAuthor {
        id
        email
        name
        url
      }
    }
    commentId
    content(format: RENDERED)
  }

  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        postId
        title
        content
        uri
        comments {
          nodes {
            ...CommentFields
            children {
              nodes {
                ...CommentFields
              }
            }
          }
        }
      }
    }
  }
`
