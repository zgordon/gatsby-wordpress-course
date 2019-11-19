import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Page = props => {
  const {
    data: {
      wpgraphql: { page },
    },
  } = props
  const { title, content } = page
  return (
    <Layout>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </Layout>
  )
}

export default Page

export const pageQuery = graphql`
  query GET_PAGE($id: ID!) {
    wpgraphql {
      page(id: $id) {
        title
        content
        uri
      }
    }
  }
`
