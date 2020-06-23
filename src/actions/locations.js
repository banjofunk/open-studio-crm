import { fetchJSON } from 'utils'
import { locationPath, locationsPath } from 'utils/apiPaths'
import * as t from 'actionTypes'

export const getLocations = () => dispatch => {
  dispatch({ type: t.FETCHING_LOCATIONS })
  fetchJSON(locationsPath(1))
  .then( payload => {
    dispatch({ type: t.GET_LOCATIONS, payload })
  })
}

export const getLocation = (locationId) => dispatch => {
  dispatch({ type: t.FETCHING_LOCATION })
  fetchJSON(locationPath(1, locationId))
  .then( payload =>
    dispatch({ type: t.GET_LOCATION, payload })
  )
}

export const clearLocation = () => dispatch => {
  dispatch({ type: t.CLEAR_LOCATION })
}

export const resetRedirect = () => dispatch => {
  dispatch({ type: t.RESET_REDIRECT })
}

export const createLocation = (location) => dispatch => {
  fetchJSON(locationsPath(1), {
    method: 'POST',
    body: JSON.stringify(location)
  })
  .then( payload =>
    dispatch({ type: t.CREATE_LOCATION, payload })
  )
}

export const deleteLocation = (locationId) => dispatch => {
  dispatch({ type: t.FETCHING_LOCATION })
  fetchJSON(locationPath(1, locationId), {
    method: 'DELETE'
  })
  .then( payload =>
    dispatch({ type: t.DELETE_LOCATION, payload: locationId })
  )
}

export const editLocation = (e, name) => dispatch => {
  const { value } = e.target
  dispatch({ type: t.EDIT_LOCATION, payload: { value, name } })
}

export const updateLocation = (location) => dispatch => {
  dispatch({ type: t.FETCHING_LOCATION })
  fetchJSON(locationPath(1, location.id), {
    method: 'PUT',
    body: JSON.stringify({location})
  })
  .then( payload =>
    dispatch({ type: t.UPDATE_LOCATION, payload })
  )
}
