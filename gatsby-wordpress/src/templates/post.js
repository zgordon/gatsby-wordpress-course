import React, { useState } from "react"
import { graphql, Link } from "gatsby"
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
  const { title, content, author, categories, tags, postId } = post

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
      <SEO title={title} />
      <h1>{title}</h1>
      <ul className="post meta">
        <li>
          Author: <Link to={`/user/${author.slug}`}>{author.name}</Link>
        </li>
        <li>
          {` // `}
          Category:
          <ul>
            {categories.nodes.map(cat => (
              <li key={cat.id}>
                <Link to={`/blog/category/${cat.slug}`}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </li>
        <li>
          {` // `}
          Tags:
          <ul>
            {tags.nodes.map(tag => (
              <li key={tag.id}>
                <Link to={`/blog/tag/${tag.slug}`}>{tag.name}</Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
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
        title
        content
        uri
        postId
        author {
          name
          slug
        }
        categories {
          nodes {
            id
            slug
            name
          }
        }
        tags {
          nodes {
            id
            slug
            name
          }
        }
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
