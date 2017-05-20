import { call, take, put, fork } from 'redux-saga/effects'
import * as Api from '../api'
import * as SubActions from '../actions/subreddit'

function * requestSubreddit () {
  while (true) {
    const { subreddit } = yield take(SubActions.REQUEST_POSTS)

    try {
      const posts = yield call(Api.fetchSubreddit, { r: subreddit })

      yield put(SubActions.receivePosts(posts, subreddit))
    } catch (err) {

    }
  }
}

export default function * root () {
  yield fork(requestSubreddit)
}