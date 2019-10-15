const path = require(`path`)
module.exports = async ({ actions, graphql }) => {
  // Setup our query
  const GET_CATEGORIES = `
    query GET_CATEGORIES($first:Int) {
      wpgraphql {
        categories(first: $first) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            categoryId
            slug
          }
        }
      }
    }
  `
  const { createPage } = actions
  const allCategories = []
  // Create a function for getting categories
  const fetchCategories = async variables =>
    await graphql(GET_CATEGORIES, variables).then(({ data }) => {
      const {
        wpgraphql: {
          categories: {
            nodes,
            pageInfo: { hasNextPage, endCursor },
          },
        },
      } = data
      nodes.map(category => {
        allCategories.push(category)
      })
      if (hasNextPage) {
        return fetchCategories({ first: variables.first, after: endCursor })
      }
      return allCategories
    })

  // Map over all the categories and call createPage
  await fetchCategories({ first: 100, after: null }).then(allCategories => {
    const categoryTemplate = path.resolve(`./src/templates/category.js`)

    allCategories.map(category => {
      console.log(`create category: ${category.slug}`)
      createPage({
        path: `/blog/category/${category.slug}`,
        component: categoryTemplate,
        context: category,
      })
    })
  })
}
