import React from "react"
import { Link } from "gatsby"

const ArchivePosts = ({ posts, title = true }) => (
  <>
    {title && <h2>Posts</h2>}
    {posts.nodes.map(post => (
      <h2 key={post.id}>
        <Link to={post.slug}>{post.title}</Link>
      </h2>
    ))}
  </>
)

export default ArchivePosts
