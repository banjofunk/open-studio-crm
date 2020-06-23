import { fetchJSON } from 'utils'
import { classEventPath, classEventsPath, classEventUsersPath, classEventUserPath } from 'utils/apiPaths'
import * as t from 'actionTypes'

export const getClassEvents = (date = false) => dispatch => {
  const url = date ? `${classEventsPath(1)}?date=${date}` : classEventsPath(1)
  dispatch({ type: t.FETCHING_CLASS_EVENTS })
  fetchJSON(url)
  .then( payload =>
    dispatch({ type: t.GET_CLASS_EVENTS, payload })
  )
}

export const getClassEvent = (classTypeId, classDate) => dispatch => {
  dispatch({ type: t.FETCHING_CLASS_EVENT })
  fetchJSON(classEventPath(classTypeId, classDate))
  .then( payload =>
    dispatch({ type: t.GET_CLASS_EVENT, payload })
  )
}

export const createClassEvent = (classEvent) => dispatch => {
  fetchJSON(classEventsPath(1), {
    method: 'POST',
    body: JSON.stringify({classEvent})
  })
  .then( payload =>
    dispatch({ type: t.CREATE_CLASS_EVENT, payload })
  )
}

export const addStudent = (classEvent, user) => dispatch => {
  fetchJSON(classEventUsersPath(1), {
    method: 'POST',
    body: JSON.stringify({ classEvent, user })
  })
  .then( payload =>
    dispatch({ type: t.ADDED_STUDENT, payload })
  )
}

export const removeStudent = (classEvent, user) => dispatch => {
  fetchJSON(classEventUserPath('removeUser'), {
    method: 'POST',
    body: JSON.stringify({ classEvent, user })
  })
  .then( payload =>
    dispatch({ type: t.ADDED_STUDENT, payload })
  )
}

export const deleteClassEvent = (classEventId) => dispatch => {
  dispatch({ type: t.FETCHING_CLASS_EVENT })
  fetchJSON(classEventPath(classEventId), {
    method: 'DELETE'
  })
  .then( payload =>
    dispatch({ type: t.DELETE_CLASS_EVENT, payload })
  )
}

export const editClassEvent = (value, name) => dispatch => {
  dispatch({ type: t.EDIT_CLASS_EVENT, payload: { value, name } })
}

export const resetRedirect = () => dispatch => {
  dispatch({ type: t.RESET_REDIRECT, payload: true })
}

export const updateClassEvent = (classEvent) => dispatch => {
  dispatch({ type: t.FETCHING_CLASS_EVENT })
  fetchJSON(classEventPath(classEvent.id), {
    method: 'PUT',
    body: JSON.stringify({classEvent})
  })
  .then( payload =>
    dispatch({ type: t.UPDATE_CLASS_EVENT, payload })
  )
}
