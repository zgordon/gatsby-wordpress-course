import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const Post = props => {
  const {
    data: {
      wpgraphql: { post },
    },
  } = props
  const { title, content, author } = post
  return (
    <Layout>
      <h1>{title}</h1>
      <ul className="meta">
        <li>
          Author: <Link to={`/user/${author.slug}`}>{author.name}</Link>
        </li>
        {post.categories.nodes.length > 0 && (
          <li>
            {" // "}
            Category:
            <ul>
              {post.categories.nodes.map(tag => (
                <li>
                  <Link to={`/blog/category/${tag.slug}`}>{tag.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        )}
        {post.tags.nodes.length > 0 && (
          <li>
            {" // "}
            Tags:
            <ul>
              {post.tags.nodes.map(tag => (
                <li>
                  <Link to={`/blog/tag/${tag.slug}`}>{tag.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Layout>
  )
}

export default Post

export const pageQuery = graphql`
  query GET_POST($id: ID!) {
    wpgraphql {
      post(id: $id) {
        title
        content
        uri
        author {
          name
          slug
        }
        categories {
          nodes {
            slug
            name
          }
        }
        tags {
          nodes {
            slug
            name
          }
        }
      }
    }
  }
`
