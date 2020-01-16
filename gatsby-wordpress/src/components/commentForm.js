import React, { useState, useContext } from "react"
import CommentContext from "../hooks/commentContext"
import gql from "graphql-tag"
import { useMutation } from "@apollo/react-hooks"

const ADD_COMMENT = gql`
  mutation(
    $author: String
    $commentOn: Int
    $content: String
    $authorEmail: String
    $parent: ID
  ) {
    createComment(
      input: {
        clientMutationId: "CreateComment"
        author: $author
        commentOn: $commentOn
        content: $content
        authorEmail: $authorEmail
        parent: $parent
      }
    ) {
      success
    }
  }
`

const CommentForm = () => {
  const commentData = useContext(CommentContext)
  const defaultValues = {
    name: ``,
    email: ``,
    comment: ``,
  }
  const [values, setValues] = useState(defaultValues)
  const [commentStatus, setCommentStatus] = useState(false)
  const [addComment, { data }] = useMutation(ADD_COMMENT, {
    onCompleted() {
      setCommentStatus(`success`)
      setValues(defaultValues)
    },
    onError() {
      setCommentStatus(`error`)
    },
  })

  const handleChange = event => {
    event.persist()
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value,
    }))
    console.log(values)
  }

  const CommentStatusFeedback = () => {
    switch (commentStatus) {
      case `success`:
        return (
          <p className="feedback success">
            Your comment has been successfully submitted. It is awaiting
            moderation.
          </p>
        )
      case `loading`:
        return (
          <p className="feedback info">
            Please wait. Your comment is being submitted.
          </p>
        )
      case `error`:
        return (
          <p className="feedback error">
            There was an error with your submission. Please contact support or
            try again later.
          </p>
        )
      default:
        return ""
    }
  }

  return (
    <form
      id="comment-form"
      onSubmit={event => {
        event.preventDefault()
        setCommentStatus(`loading`)
        addComment({
          variables: {
            author: values.name,
            commentOn: commentData.postId,
            content: values.comment,
            authorEmail: values.email,
            parent: commentData.commentId,
          },
        })
      }}
    >
      {!!commentStatus && <CommentStatusFeedback />}
      <h3>
        Leave a Reply
        {commentData.commentId && (
          <button
            id="cancel-reply"
            onClick={() => {
              commentData.updateCommentId(null)
            }}
          >
            Cancel Reply
          </button>
        )}
      </h3>
      <p>
        <label htmlFor="comment-field">Comment</label>
        <textarea
          name="comment"
          id="comment-field"
          onChange={handleChange}
          value={values.comment}
          required
          disabled={commentStatus === `loading`}
        ></textarea>
      </p>
      <div className="meta">
        <p>
          <label htmlFor="name-field">Name</label>
          <input
            type="text"
            name="name"
            id="name-field"
            value={values.name}
            onChange={handleChange}
            required
            disabled={commentStatus === `loading`}
          />
        </p>
        <p>
          <label htmlFor="email-field">Email</label>
          <input
            type="email"
            name="email"
            id="email-field"
            value={values.email}
            onChange={handleChange}
            required
            disabled={commentStatus === `loading`}
          />
        </p>
      </div>
      <p>
        <input
          type="submit"
          value="Submit"
          id="submit-button"
          disabled={commentStatus === `loading`}
        />
      </p>
    </form>
  )
}

export default CommentForm
