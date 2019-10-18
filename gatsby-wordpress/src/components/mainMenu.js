import React from "react"
import { Link, StaticQuery, graphql } from "gatsby"

const MAIN_MENU_QUERY = graphql`
  fragment MenuFields on WPGraphQL_MenuItem {
    id
    label
    url
    connectedObject {
      __typename
    }
  }

  query GET_MENU_ITEMS {
    wpgraphql {
      menuItems(where: { location: PRIMARY }) {
        nodes {
          ...MenuFields
          childItems {
            nodes {
              ...MenuFields
            }
          }
        }
      }
    }
  }
`

const MainMenu = props => {
  return (
    <StaticQuery
      query={MAIN_MENU_QUERY}
      render={data => {
        console.log(data)
        return (
          <nav>
            <ul></ul>
          </nav>
        )
      }}
    />
  )
}

export default MainMenu
