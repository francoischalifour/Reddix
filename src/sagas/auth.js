import qs from 'querystring'
import { all, take, put, fork, select } from 'redux-saga/effects'
import Api from '../api/Api'
import * as AuthActions from '../actions/auth'
import * as SubredditActions from '../actions/subreddit'
import * as MeActions from '../actions/me'

const REFRESH_TOKEN_KEY = 'REDDIX::refresh_token'
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
const REDIRECT_URL = process.env.REACT_APP_OAUTH_REDIRECT_URL

const watchOauthWindow = wOauth => new Promise((resolve, reject) => {
  let interval = setInterval(() => {
    try {
      const href = wOauth.location.href
      const query = qs.parse(href)
      resolve(query.code)
      wOauth.close()
    } catch (err) {
      // Cannot read when on reddit oauth page
    }
  }, 2000)
})

function * setUp (r) {
  const [me, _subreddits] = yield Promise.all([
    r.getMe(),
    r.getSubscriptions()
  ])
  const subreddits = _subreddits.data.children.map(x => x.data)

  yield all([
    put(AuthActions.loginSuccess(r)),
    put(MeActions.receiveMe(me)),
    put(SubredditActions.receiveSubscriptions(subreddits))
  ])
}

function * loginFromLocalStorage () {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)

  if (refreshToken) {
    const r = yield Api.fromRefreshToken({
      refreshToken,
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URL
    })

    yield setUp(r)
  }
}

function * loginFlow () {
  yield loginFromLocalStorage()

  while (true) {
    yield take(AuthActions.LOGIN)
    const scope = [
      'subscribe',
      'vote',
      'mysubreddits',
      'submit',
      'save',
      'read',
      'identity',
      'account',
      'edit',
      'history'
    ]

    const authUrl = Api.getAuthUrl({
      clientId: CLIENT_ID,
      scope,
      redirectUri: REDIRECT_URL
    })

    const wOauth = window.open(authUrl, "Authorize Reddix", "width=800, height=600")
  
    const code = yield watchOauthWindow(wOauth)

    if (!code) {
      yield put(AuthActions.LOGIN_FAILED)
      return
    }

    const r = yield Api.fromAuthCode({
      code,
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URL
    })

    localStorage.setItem(REFRESH_TOKEN_KEY, r.refreshToken)

    yield setUp(r)

  }
}

function * logout () {
  while (true) {
    // When the user wishes to logout
    yield take(AuthActions.LOGOUT_REQUEST)

    // 1. Revoke the refresh token
    const r = yield select(state => state.auth)
    yield r.revokeRefreshToken()

    // 2. Remove the refresh token from the locale storage
    localStorage.removeItem(REFRESH_TOKEN_KEY)

    // 3. Reset the app (see root reducer)
    yield put(AuthActions.logout())
  }
}

export default function * root () {
  yield fork(loginFlow)
  yield fork(logout)
}