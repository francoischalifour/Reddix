import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ThumbnailContainer from '../containers/ThumbnailContainer'

const Outer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 18px;

  a:last-child {
    flex: 1;
    text-decoration: none;
    color: inherit;
  }
`

const ThreadHeader = props => {
  return (
    <Outer>
      <ThumbnailContainer {...props} />

      <Link
        to={`/r/${props.subreddit}/comments/${props.id}`}
      >
        {props.title}
      </Link>
    </Outer>
  )
}

export default ThreadHeader