import { fetchJSON } from 'utils'
import { classTypePath, classTypesPath } from 'utils/apiPaths'
import * as t from 'actionTypes'

export const getClassTypes = () => dispatch => {
  dispatch({ type: t.FETCHING_CLASS_TYPES })
  fetchJSON(classTypesPath(1))
  .then( payload =>
    dispatch({ type: t.GET_CLASS_TYPES, payload })
  )
}

export const getClassType = (classTypeId) => dispatch => {
  dispatch({ type: t.FETCHING_CLASS_TYPE })
  fetchJSON(classTypePath(1, classTypeId))
  .then( payload =>
    dispatch({ type: t.GET_CLASS_TYPE, payload })
  )
}

export const editClassType = (e, name) => dispatch => {
  const { value } = e.target
  dispatch({ type: t.EDIT_CLASS_TYPE, payload: { value, name } })
}

export const editClassTypeDescription = (description) => dispatch => {
  dispatch({ type: t.EDIT_CLASS_TYPE_DESCRIPTION, payload: {description} })
}

export const clearClassType = () => dispatch => {
  dispatch({ type: t.CLEAR_CLASS_TYPE, payload: true })
}

export const resetRedirect = () => dispatch => {
  dispatch({ type: t.RESET_REDIRECT, payload: true })
}

export const createClassType = (classType) => dispatch => {
  dispatch({ type: t.FETCHING_CLASS_TYPE })
  fetchJSON(classTypesPath(1), {
    method: 'POST',
    body: JSON.stringify({classType})
  })
  .then( payload => {
    dispatch({ type: t.CREATE_CLASS_TYPE, payload })
  })
  .catch( err => {
    debugger
  })
}

export const deleteClassType = (classTypeId) => dispatch => {
  dispatch({ type: t.FETCHING_CLASS_TYPE })
  fetchJSON(classTypePath(1, classTypeId), {
    method: 'DELETE'
  })
  .then( payload =>
    dispatch({ type: t.DELETE_CLASS_TYPE, payload })
  )
}

export const updateClassType = (classType) => dispatch => {
  dispatch({ type: t.FETCHING_CLASS_TYPE })
  fetchJSON(classTypePath(1, classType.id), {
    method: 'PUT',
    body: JSON.stringify({classType})
  })
  .then( payload =>
    dispatch({ type: t.UPDATE_CLASS_TYPE, payload })
  )
}
