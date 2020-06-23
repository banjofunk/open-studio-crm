import { fetchJSON } from 'utils'
import { userPath, usersPath } from 'utils/apiPaths'
import qs from 'querystring'
import * as t from 'actionTypes'

export const getUsers = (options = {}) => dispatch => {
  const { filter, page } = options
  const url = `${usersPath(1)}?${qs.stringify({ filter, page })}`
  dispatch({ type: t.FETCHING_USERS })
  fetchJSON(url)
  .then( payload =>
    dispatch({ type: t.GET_USERS, payload })
  )
}

export const getMoreUsers = (options = {}) => dispatch => {
  const { filter, page } = options
  const url = `${usersPath(1)}?${qs.stringify({ filter, page })}`
  dispatch({ type: t.FETCHING_USERS })
  fetchJSON(url)
  .then( payload =>
    dispatch({ type: t.GET_MORE_USERS, payload })
  )
}

export const getUser = (userId) => dispatch => {
  dispatch({ type: t.FETCHING_USER })
  fetchJSON(userPath(userId))
  .then( payload =>
    dispatch({ type: t.GET_USER, payload })
  )
}

export const createUser = (user) => dispatch => {
  fetchJSON(usersPath(1), {
    method: 'POST',
    body: JSON.stringify({user})
  })
  .then( payload =>
    dispatch({ type: t.CREATE_USER, payload })
  )
}

export const deleteUser = (userId) => dispatch => {
  dispatch({ type: t.FETCHING_USER })
  fetchJSON(userPath(userId), {
    method: 'DELETE'
  })
  .then( payload =>
    dispatch({ type: t.DELETE_USER, payload })
  )
}

export const editUser = (value, name) => dispatch => {
  dispatch({ type: t.EDIT_USER, payload: { value, name } })
}

export const editUserDescription = (description) => dispatch => {
  dispatch({ type: t.EDIT_USER_DESCRIPTION, payload: {description} })
}

export const resetRedirect = () => dispatch => {
  dispatch({ type: t.RESET_REDIRECT, payload: true })
}

export const updateUser = (user) => dispatch => {
  dispatch({ type: t.FETCHING_USER })
  fetchJSON(userPath(user.id), {
    method: 'PUT',
    body: JSON.stringify({user})
  })
  .then( payload =>
    dispatch({ type: t.UPDATE_USER, payload })
  )
}
