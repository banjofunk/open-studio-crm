import { fetchJSON } from 'utils'
import { locationRoomsPath, roomPath } from 'utils/apiPaths'
import * as t from 'actionTypes'


export const clearRoom = () => dispatch => {
  dispatch({ type: t.CLEAR_ROOM })
}

export const resetRedirect = () => dispatch => {
  dispatch({ type: t.RESET_REDIRECT })
}

export const getRooms = (locationId) => dispatch => {
  dispatch({ type: t.FETCHING_ROOMS })
  fetchJSON(locationRoomsPath(locationId))
  .then( payload =>
    dispatch({ type: t.GET_ROOMS, payload })
  )
}

export const getRoom = (roomId) => dispatch => {
  dispatch({ type: t.FETCHING_ROOM })
  fetchJSON(roomPath(roomId))
  .then( payload =>
    dispatch({ type: t.GET_ROOM, payload })
  )
}

export const createRoom = (room) => dispatch => {
  fetchJSON(locationRoomsPath(room.locationId), {
    method: 'POST',
    body: JSON.stringify(room)
  })
  .then( payload =>
    dispatch({ type: t.CREATE_ROOM, payload })
  )
}

export const deleteRoom = (roomId) => dispatch => {
  dispatch({ type: t.FETCHING_ROOM })
  fetchJSON(roomPath(roomId), {
    method: 'DELETE'
  })
  .then( payload =>
    dispatch({ type: t.DELETE_ROOM, payload: roomId })
  )
}

export const editRoom = (e, name) => dispatch => {
  const { value } = e.target
  dispatch({ type: t.EDIT_ROOM, payload: { value, name } })
}

export const updateRoom = (room) => dispatch => {
  dispatch({ type: t.FETCHING_ROOM })
  fetchJSON(roomPath(room.id), {
    method: 'PUT',
    body: JSON.stringify({room})
  })
  .then( payload =>
    dispatch({ type: t.UPDATE_ROOM, payload })
  )
}
