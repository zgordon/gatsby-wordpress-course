const path = require(`path`)
module.exports = async ({ actions, graphql }) => {
  // Setup our query
  const GET_PAGES = `
    query GET_PAGES($first:Int $after:String) {
      wpgraphql {
        pages(
          first: $first
          after: $after
          where: {
            parent: null
          }
        ) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            uri
            pageId
            title
            isFrontPage
          }
        }
      }
    }
  `
  const { createPage } = actions
  const allPages = []
  // Create a function for getting pages
  const fetchPages = async variables =>
    await graphql(GET_PAGES, variables).then(({ data }) => {
      const {
        wpgraphql: {
          pages: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data
      nodes.map(page => {
        if (page.uri !== `blog`) allPages.push(page)
      })
      if (hasNextPage) {
        return fetchPages({ first: variables.first, after: endCursor })
      }
      return allPages
    })

  // Map over all the pages and call createPage
  await fetchPages({ first: 100, after: null }).then(allPages => {
    const pageTemplate = path.resolve(`./src/templates/page.js`)

    allPages.map(page => {
      if (page.isFrontPage === true) page.uri = ``
      console.log(`create page: ${page.uri}`)
      createPage({
        path: `/${page.uri}`,
        component: pageTemplate,
        context: page,
      })
    })
  })
}
