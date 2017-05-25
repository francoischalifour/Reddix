import React from 'react'
import Humanize from 'humanize-plus'
import moment from 'moment'
import { Link } from 'react-router-dom'

const PostItem = ({
  id,
  score,
  author,
  title,
  subreddit,
  thumbnail,
  created_utc,
  domain,
  num_comments
}) => (
  <div className='post-item'>
    <div className='post-item__header'>
      <div className='post-item__score'>
        {Humanize.compactInteger(score, 1)}
      </div>
      <div className='post-item__meta'>
        <Link to={`/u/${author}`}>{author}</Link> in <Link to={`/r/${subreddit}`}>{subreddit}</Link>
      </div>
    </div>
    <div className='post-item__content'>
      <div className='post-item__title'>
        <Link to={`/r/${subreddit}/comments/${id}`}>{title}</Link>
      </div>
    </div>
    <div className='post-item__footer'>
      <div className='post-item__comments'>{num_comments} comments</div>
      <div className='post-item__source'>{domain}</div>
      <div className='post-item__created'>{moment(created_utc * 1000).fromNow()}</div>
    </div>
  </div>
)

export default PostItem