import { combineReducers } from 'redux'
import { LOGOUT } from '../actions/auth'
import comments from './comments'
import me from './me'
import posts from './posts'
import r from './r'
import subreddits from './subreddits'
import subscriptions from './subscriptions'
import ui from './ui'

const reducer = combineReducers({
  comments,
  me,
  posts,
  r,
  subreddits,
  subscriptions,
  ui
})

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined
  }

  return reducer(state, action)
}

export default rootReducer