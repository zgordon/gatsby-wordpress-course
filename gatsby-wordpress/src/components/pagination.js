import React from "react"
import { Link } from "gatsby"

const Pagination = ({ pageNumber, hasNextPage }) => {
  let prevLink = null
  if (1 === pageNumber) {
    prevLink = `/blog/`
  } else if (1 < pageNumber) {
    prevLink = `/blog/page/${pageNumber - 1}`
  }

  let nextLink = null
  if (hasNextPage) {
    nextLink = `/blog/page/${pageNumber + 1}`
  }

  return (
    <nav>
      <ul>
        {prevLink && (
          <li>
            <Link to={prevLink}>&lt; Previous Posts</Link>
          </li>
        )}
        {nextLink && (
          <li>
            <Link to={nextLink}>Next Posts &gt;</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Pagination
